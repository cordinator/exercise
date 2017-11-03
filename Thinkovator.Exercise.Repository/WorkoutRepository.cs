using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository.Context;

namespace Thinkovator.Exercise.Repository
{
  public interface IWorkoutRepository
  {
    Task<IEnumerable<Workout>> GetAll(string userId, int profileId);
    Task<IEnumerable<string>> GetVideos(string userId, int workoutId);
  }

  public class WorkoutRepository : IWorkoutRepository
  {
    public async Task<IEnumerable<Workout>> GetAll(string userId, int profileId)
    {
      using (var context = new ExerciseContext())
      {
        var result = await context.Workouts
          .Where(w => w.UserId == "-1" || (w.UserId == userId && w.ProfileId == profileId && w.Deleted == null))
          .ToListAsync();
        return result;
      }
    }

    public async Task<IEnumerable<string>> GetVideos(string userId, int workoutId)
    {
      using (var context = new ExerciseContext())
      {
        var videos = await context.Workouts.Join(
          context.WorkoutVideos,
          w => w.Id,
          wv => wv.WorkoutId,
          (w, wv) => new
          {
            UserId = w.UserId,
            WorkoutId = w.Id,
            VideoId = wv.VideoId
          })
          .Join(
          context.Videos,
          r => r.VideoId,
          v => v.Id,
          (r, v) => new
          {
            UserId = r.UserId,
            WorkoutId = r.WorkoutId,
            Name = v.Name
          })
          .Where(w => (w.UserId == "-1" || w.UserId == userId) && w.WorkoutId == workoutId)
          .Select(s => s.Name)
          .ToListAsync();

        return videos;
      }
    }
  }
}
