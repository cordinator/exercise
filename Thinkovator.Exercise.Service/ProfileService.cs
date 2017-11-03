using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface IProfileService
  {
    Task<IEnumerable<Profile>> Get(string userId);
    Task<Profile> Get(string userId, int id);
    Task<bool> Create(string userId, Profile profile);
    Task<bool> Update(string userId, Profile profile);
    Task<bool> Delete(string userId, int id);
    Task<bool> ValidatePin(string userId, int id, string pin);
    Task<IEnumerable<Reward>> GetRewards(string userId, int profileId);
    Task<bool> CreateReward(string userId, int profileId, int rewardId);
    Task<bool> DeleteReward(string userId, int profileId, int profileRewardId);
    Task<bool> CreateSession(string userId, int profileId, Session session);
  }

  public class ProfileService : IProfileService
  {
    private readonly IProfileRepository _profileRepository;
    private readonly IRewardRepository _rewardRepository;
    private readonly IWorkoutHistoryService _exerciseHistoryService;
    private readonly IDateTimeService _dateTimeService;

    public ProfileService(IProfileRepository profileRepository, 
      IRewardRepository rewardRepository, 
      IWorkoutHistoryService exerciseHistoryService,
      IDateTimeService dateTimeService)
    {
      _profileRepository = profileRepository;
      _rewardRepository = rewardRepository;
      _exerciseHistoryService = exerciseHistoryService;
      _dateTimeService = dateTimeService;
    }

    public async Task<IEnumerable<Profile>> Get(string userId)
    {
      var results = await _profileRepository.Get(userId);
      return results;
    }

    public async Task<Profile> Get(string userId, int id)
    {
      var result = await _profileRepository.Get(userId, id);
      return result;
    }

    public async Task<bool> Create(string userId, Profile profile)
    {
      profile.UserId = userId;

      var result = await _profileRepository.Create(profile);
      return result;
    }

    public async Task<bool> Update(string userId, Profile profile)
    {
      profile.UserId = userId;

      var result = await _profileRepository.Update(profile);
      return result;
    }

    public async Task<bool> Delete(string userId, int id)
    {
      var result = await _profileRepository.Delete(userId, id);
      return result;
    }

    public async Task<bool> ValidatePin(string userId, int id, string pin)
    {
      var profile = await _profileRepository.Get(userId, id);
      if (profile != null && profile.IsAdmin && profile.Pin.Equals(pin))
        return true;

      return false;
    }

    public async Task<IEnumerable<Reward>> GetRewards(string userId, int profileId)
    {
      var user = await Get(userId, profileId);
      if (user == null)
        return new List<Reward>();

      var results = await _profileRepository.GetRewards(profileId);
      return results;
    }
    
    public async Task<bool> CreateReward(string userId, int profileId, int rewardId)
    {
      var user = await Get(userId, profileId);
      if (user == null)
        return false;

      var reward = await _rewardRepository.Get(userId, rewardId);
      if (reward == null)
        return false;

      user.Points = user.Points - reward.Points;
      if (user.Points < 0)
        return false;

      var pointsUpdated = await _profileRepository.UpdatePoints(user);
      if (!pointsUpdated)
        return false;

      var result = await _profileRepository.CreateReward(userId, profileId, rewardId);
      return result;
    }

    public async Task<bool> DeleteReward(string userId, int profileId, int profileRewardId)
    {
      var user = await Get(userId, profileId);
      if (user == null)
        return false;

      var result = await _profileRepository.DeleteReward(profileId, profileRewardId);
      return result;
    }

    public async Task<bool> CreateSession(string userId, int profileId, Session session)
    {
      var user = await Get(userId, profileId);
      if (user == null)
        return false;

      var history = new WorkoutHistory
      {
        ProfileId = profileId,
        LengthInSeconds = session.LengthInSeconds,
        WorkoutId = session.WorkoutId,
        WorkoutDate = _dateTimeService.UtcNow()
      };

      var result = await _exerciseHistoryService.Create(userId, history);
      return result;
    }
  }
}
