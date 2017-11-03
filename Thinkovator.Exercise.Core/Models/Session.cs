namespace Thinkovator.Exercise.Core.Models
{
  public class Session : Base
  {
    public int ProfileId { get; set; }
    public int WorkoutId { get; set; }
    public int LengthInSeconds { get; set; }
  }
}
