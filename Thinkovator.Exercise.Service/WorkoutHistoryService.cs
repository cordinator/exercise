using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface IWorkoutHistoryService
  {
    Task<IEnumerable<WorkoutHistory>> Get(string userId, int profileId);
    Task<WorkoutHistory> GetLatest(string userId, int profileId);
    Task<IEnumerable<WorkoutHistory>> Top(string userId, int profileId, int? quantity);
    Task<bool> Create(string userId, WorkoutHistory history);
    Task<bool> Update(string userId, WorkoutHistory history);
    Task<bool> Delete(string userId, int profileId, int id);
  }

  public class WorkoutHistoryService : IWorkoutHistoryService
  {
    private readonly IWorkoutHistoryRepository _workoutHistoryRepository;
    private readonly IPointService _pointService;
    private readonly ICalorieService _calorieService;

    public WorkoutHistoryService(IWorkoutHistoryRepository workoutRepositoryHistory, IPointService pointService, ICalorieService calorieService)
    {
      _workoutHistoryRepository = workoutRepositoryHistory;
      _pointService = pointService;
      _calorieService = calorieService;
    }

    public async Task<IEnumerable<WorkoutHistory>> Get(string userId, int profileId)
    {
      var results = await _workoutHistoryRepository.Get(userId, profileId);
      return results;
    }

    public async Task<WorkoutHistory> GetLatest(string userId, int profileId)
    {
      var result = await _workoutHistoryRepository.GetLatest(userId, profileId, 1);
      return result.FirstOrDefault();
    }

    public async Task<IEnumerable<WorkoutHistory>> Top(string userId, int profileId, int? quantity)
    {
      var result = await _workoutHistoryRepository.GetLatest(userId, profileId, quantity);
      return result;
    }

    public async Task<bool> Create(string userId, WorkoutHistory history)
    {
      history.UserId = userId;

      var pointsUpdated = await _pointService.UpdatePoints(userId, history.ProfileId, history.LengthInSeconds);
      if (!pointsUpdated)
        return false;

      history.PointsEarned = _pointService.CalculatePoints(history.LengthInSeconds);
      history.CaloriesBurned = _calorieService.CalculateCaloriesBurned(history.LengthInSeconds);

      var result = await _workoutHistoryRepository.Create(history);
      return result;
    }

    public async Task<bool> Update(string userId, WorkoutHistory history)
    {
      history.UserId = userId;

      var exercise = await _workoutHistoryRepository.GetWorkout(userId, history.Id);
      if (exercise == null)
        return false;

      var diff = history.LengthInSeconds - exercise.LengthInSeconds;

      var pointsUpdated = await _pointService.UpdatePoints(userId, history.ProfileId, diff);
      if (!pointsUpdated)
        return false;

      history.PointsEarned = _pointService.CalculatePoints(history.LengthInSeconds);
      history.CaloriesBurned = _calorieService.CalculateCaloriesBurned(history.LengthInSeconds);

      var result = await _workoutHistoryRepository.Update(history);
      return result;
    }

    public async Task<bool> Delete(string userId, int profileId, int id)
    {
      var exercise = await _workoutHistoryRepository.GetWorkout(userId, id);
      if (exercise == null)
        return false;
      
      var pointsUpdated = await _pointService.UpdatePoints(userId, profileId, -exercise.LengthInSeconds);
      if (!pointsUpdated)
        return false;

      return await _workoutHistoryRepository.Delete(userId, id);
    }
  }
}
