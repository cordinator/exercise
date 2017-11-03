using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository.Context;

namespace Thinkovator.Exercise.Repository
{
  public interface IWorkoutHistoryRepository
  {
    Task<IEnumerable<WorkoutHistory>> Get(string userId, int profileId);
    Task<IEnumerable<WorkoutHistory>> GetLatest(string userId, int profileId, int? quanitty);
    Task<WorkoutHistory> GetWorkout(string userId, int id);
    Task<bool> Create(WorkoutHistory history);
    Task<bool> Update(WorkoutHistory history);
    Task<bool> Delete(string userId, int id);
  }

  public class WorkoutHistoryRepository : IWorkoutHistoryRepository
  {
    public async Task<IEnumerable<WorkoutHistory>> Get(string userId, int profileId)
    {
      return await GetLatest(userId, profileId, int.MaxValue);
    }
    
    public async Task<IEnumerable<WorkoutHistory>> GetLatest(string userId, int profileId, int? quantity)
    {
      var qty = quantity ?? 1;
      
      using (var context = new ExerciseContext())
      {
        var results = await context.WorkoutHistory.Join(
          context.Workouts,
          e => e.WorkoutId,
          w => w.Id,
          (e, w) => new
          {
            Id = e.Id,
            UserId = e.UserId,
            ProfileId = e.ProfileId,
            LengthInSeconds = e.LengthInSeconds,
            PointsEarned = e.PointsEarned,
            CaloriesBurned = e.CaloriesBurned,
            WorkoutId = w.Id,
            WorkoutName = w.Name,
            WorkoutDate = e.WorkoutDate,
            Deleted = e.Deleted
          })
          .Where(w => w.UserId == userId && w.ProfileId == profileId && w.Deleted == null)
          .OrderByDescending(o => o.WorkoutDate)
          .Take(qty)
          .ToListAsync();

        return results.Select(s => new WorkoutHistory
        {
          Id = s.Id,
          ProfileId = s.ProfileId,
          WorkoutId = s.WorkoutId,
          WorkoutName = s.WorkoutName,
          CaloriesBurned = s.CaloriesBurned,
          LengthInSeconds = s.LengthInSeconds,
          PointsEarned = s.PointsEarned,
          WorkoutDate = s.WorkoutDate
        });
      }
    }

    public async Task<WorkoutHistory> GetWorkout(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.WorkoutHistory.Join(
          context.Workouts,
          e => e.WorkoutId,
          w => w.Id,
          (e, w) => new
          {
            Id = e.Id,
            UserId = e.UserId,
            ProfileId = e.ProfileId,
            LengthInSeconds = e.LengthInSeconds,
            PointsEarned = e.PointsEarned,
            CaloriesBurned = e.CaloriesBurned,
            WorkoutId = w.Id,
            WorkoutName = w.Name,
            ExerciseDate = e.WorkoutDate,
            Deleted = e.Deleted
          })
          .FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id);

        if (result == null)
          return null;

        return new WorkoutHistory
        {
          Id = result.Id,
          ProfileId = result.ProfileId,
          WorkoutId = result.WorkoutId,
          WorkoutName = result.WorkoutName,
          CaloriesBurned = result.CaloriesBurned,
          LengthInSeconds = result.LengthInSeconds,
          PointsEarned = result.PointsEarned,
          WorkoutDate = result.ExerciseDate
        };
      }
    }

    public async Task<bool> Create(WorkoutHistory history)
    {
      using (var context = new ExerciseContext())
      {
        history.Created = DateTime.UtcNow;

        context.WorkoutHistory.Add(history);

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Update(WorkoutHistory history)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.WorkoutHistory.FirstOrDefaultAsync(f => f.UserId == history.UserId && f.Id == history.Id);
        if (result == null)
          return false;

        result.CaloriesBurned = history.CaloriesBurned;
        result.LengthInSeconds = history.LengthInSeconds;
        result.PointsEarned = history.PointsEarned;
        result.WorkoutId = history.WorkoutId;
        result.WorkoutDate = history.WorkoutDate;
        result.Updated = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }

    public async Task<bool> Delete(string userId, int id)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.WorkoutHistory.FirstOrDefaultAsync(f => f.UserId == userId && f.Id == id);
        if (result == null)
          return false;

        result.Deleted = DateTime.UtcNow;

        var saved = await context.SaveChangesAsync();
        return saved > 0;
      }
    }
  }
}
