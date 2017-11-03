using System;

namespace Thinkovator.Exercise.Core.Models
{
  public class WorkoutVideo
  {
    public int Id { get; set; }
    public int WorkoutId { get; set; }
    public int VideoId { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Deleted { get; set; }
  }
}
