using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface IWorkoutService
  {
    Task<IEnumerable<Workout>> GetAll(string userId, int profileId);
    Task<IEnumerable<string>> GetVideos(string userId, int workoutId);
  }

  public class WorkoutService : IWorkoutService
  {
    private readonly IWorkoutRepository _workoutRepository;

    public WorkoutService(IWorkoutRepository workoutRepository)
    {
      _workoutRepository = workoutRepository;
    }

    public async Task<IEnumerable<Workout>> GetAll(string userId, int profileId)
    {
      var results = await _workoutRepository.GetAll(userId, profileId);
      return results;
    }

    public async Task<IEnumerable<string>> GetVideos(string userId, int workoutId)
    {
      var videos = await _workoutRepository.GetVideos(userId, workoutId);
      return videos;
    }
  }
}
