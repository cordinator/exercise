using System;
using Thinkovator.Exercise.Core.Enums;

namespace Thinkovator.Exercise.Core.Models
{
  public class Profile : Base
  {
    public string Name { get; set; }
    public string Pin { get; set; }
    public int Points { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
    public DateTime? LastExercised { get; set; }
    public Units? Units { get; set; }
    public bool IsAdmin { get; set; }
  }
}
