using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository.Context;

namespace Thinkovator.Exercise.Repository
{
  public interface IRewardRepository
  {
    Task<IEnumerable<Reward>> Get(string userId);
    Task<Reward> Get(string userId, int id);
    Task<bool> Create(Reward reward);
    Task<bool> Update(Reward reward);
    Task<bool> Delete(string userId, int id);
  }

  public class RewardRepository : IRewardRepository
  {
    public async Task<IEnumerable<Reward>> Get(string userId)
    {
      using (var context = new ExerciseContext())
      {
        var results = await context.Rewards.Where(w => w.UserId == userId && w.Deleted == null).ToListAsync();
        return results;
      }
    }

    public async Task<Reward> Get(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Rewards.FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id && f.Deleted == null) ?? new Reward();
        return result;
      }
    }

    public async Task<bool> Create(Reward reward)
    {
      using (var context = new ExerciseContext())
      {
        reward.Created = DateTime.UtcNow;

        context.Rewards.Add(reward);

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Update(Reward reward)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Rewards.FirstOrDefaultAsync(f => f.UserId == reward.UserId && f.Id == reward.Id);
        if (result == null)
          return false;
        
        result.Name = reward.Name;
        result.Description = reward.Description;
        result.Points = reward.Points;
        result.Updated = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Delete(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Rewards.FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id);
        if (result == null)
          return false;

        result.Deleted = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }
  }
}
