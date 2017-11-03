using System;

namespace Thinkovator.Exercise.Core.Models
{
  public class WorkoutHistory : Base
  {
    public int ProfileId { get; set; }
    public int LengthInSeconds { get; set; }
    public int PointsEarned { get; set; }
    public int CaloriesBurned { get; set; }
    public int WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public DateTime WorkoutDate { get; set; }
  }
}
