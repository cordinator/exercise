using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository.Context;

namespace Thinkovator.Exercise.Repository
{
  public interface IProfileRepository
  {
    Task<IEnumerable<Profile>> Get(string userId);
    Task<Profile> Get(string userId, int id);
    Task<bool> Create(Profile profile);
    Task<bool> Update(Profile profile);
    Task<bool> Delete(string userId, int id);
    Task<IEnumerable<Reward>> GetRewards(int id);
    Task<bool> CreateReward(string userId, int id, int profileRewardId);
    Task<bool> DeleteReward(int id, int profileRewardId);
    Task<bool> UpdatePoints(Profile profile);
  }

  public class ProfileRepository : IProfileRepository
  {
    public async Task<IEnumerable<Profile>> Get(string userId)
    {
      using (var context = new ExerciseContext())
      {
        var results = await context.Profiles.Where(w => w.UserId == userId && w.Deleted == null).ToListAsync();
        return results;
      }
    }

    public async Task<Profile> Get(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Profiles.FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id && f.Deleted == null);
        return result;
      }
    }

    public async Task<bool> Create(Profile profile)
    {
      using (var context = new ExerciseContext())
      {
        profile.Created = DateTime.UtcNow;

        context.Profiles.Add(profile);

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Update(Profile profile)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Profiles.FirstOrDefaultAsync(f => f.UserId == profile.UserId && f.Id == profile.Id);
        if (result == null)
          return false;

        result.Age = profile.Age;
        result.Name = profile.Name;
        result.Weight = profile.Weight;
        result.Units = profile.Units;
        result.Updated = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Delete(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Profiles.FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id);
        if (result == null)
          return false;

        if (result.IsAdmin)
          return false;

        result.Deleted = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<IEnumerable<Reward>> GetRewards(int profileId)
    {
      using (var context = new ExerciseContext())
      {
        var results = await context.Rewards
          .Join(
            context.RewardsBought,
            r => r.Id,
            b => b.RewardId,
            (r, b) => new
            {
              Id = b.Id,
              ProfileId = b.ProfileId,
              Name = r.Name,
              Description = r.Description,
              Deleted = b.Deleted
            })
          .Where(w => w.ProfileId == profileId && w.Deleted == null)
          .Select(s => new
          {
            Id = s.Id,
            Name = s.Name,
            Description = s.Description
          }).ToListAsync();

        return results.Select(s => new Reward
        {
          Id = s.Id,
          Name = s.Name,
          Description = s.Description
        });
      }
    }

    public async Task<bool> CreateReward(string userId, int profileId, int profileRewardId)
    {
      using (var context = new ExerciseContext())
      {
        var rewardBought = new RewardsBought
        {
          UserId = userId,
          ProfileId = profileId,
          RewardId = profileRewardId,
          Created = DateTime.UtcNow
        };

        context.RewardsBought.Add(rewardBought);

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> DeleteReward(int profileId, int profileRewardId)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.RewardsBought.FirstOrDefaultAsync(f => f.ProfileId == profileId && f.Id == profileRewardId);
        if (result == null)
          return false;

        result.Deleted = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> UpdatePoints(Profile profile)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Profiles.FirstOrDefaultAsync(f => f.UserId == profile.UserId && f.Id == profile.Id);
        if (result == null)
          return false;

        result.Points = profile.Points;
        result.Updated = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }
  }
}
