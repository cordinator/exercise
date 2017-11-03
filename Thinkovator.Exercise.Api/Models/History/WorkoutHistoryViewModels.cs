using System;

namespace Thinkovator.Exercise.Api.Models.History
{
  public class ExerciseHistoryViewModel
  {
    public int Id { get; set; }
    public int ProfileId { get; set; }
    public int LengthInSeconds { get; set; }
    public int PointsEarned { get; set; }
    public int CaloriesBurned { get; set; }
    public DateTime WorkoutDate { get; set; }
    public Core.Models.Workout Workout { get; set; }
  }

  public class LatestWorkoutViewModel
  {
    public string WorkoutName { get; set; }
    public int LengthInSeconds { get; set; }
    public int PointsEarned { get; set; }
    public int CaloriesBurned { get; set; }
    public DateTime WorkoutDate { get; set; }
  }
}