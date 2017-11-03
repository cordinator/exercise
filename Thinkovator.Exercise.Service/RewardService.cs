using System.Collections.Generic;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface IRewardService
  {
    Task<IEnumerable<Reward>> Get(string userId);
    Task<Reward> Get(string userId, int id);
    Task<bool> Create(string userId, Reward reward);
    Task<bool> Update(string userId, Reward reward);
    Task<bool> Delete(string userId, int id);
  }

  public class RewardService : IRewardService
  {
    private readonly IRewardRepository _rewardRepository;

    public RewardService(IRewardRepository rewardRepository)
    {
      _rewardRepository = rewardRepository;
    }

    public async Task<IEnumerable<Reward>> Get(string userId)
    {
      var results = await _rewardRepository.Get(userId);
      return results;
    }

    public async Task<Reward> Get(string userId, int id)
    {
      var result = await _rewardRepository.Get(userId, id);
      return result;
    }

    public async Task<bool> Create(string userId, Reward reward)
    {
      reward.UserId = userId;

      var result = await _rewardRepository.Create(reward);
      return result;
    }

    public async Task<bool> Update(string userId, Reward reward)
    {
      reward.UserId = userId;

      var result = await _rewardRepository.Update(reward);
      return result;
    }

    public async Task<bool> Delete(string userId, int id)
    {
      var result = await _rewardRepository.Delete(userId, id);
      return result;
    }
  }
}
