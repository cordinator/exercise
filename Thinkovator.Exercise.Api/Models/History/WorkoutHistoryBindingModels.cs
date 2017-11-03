using System;

namespace Thinkovator.Exercise.Api.Models.History
{
  public class WorkoutHistoryBaseBindingModel
  {
    public int ProfileId { get; set; }
    public int LengthInSeconds { get; set; }
    public int WorkoutId { get; set; }
    public DateTime WorkoutDate { get; set; }
  }

  public class CreateWorkoutHistoryBindingModel : WorkoutHistoryBaseBindingModel
  {

  }

  public class UpdateWorkoutHistoryBindingModel : WorkoutHistoryBaseBindingModel
  {
  }
}