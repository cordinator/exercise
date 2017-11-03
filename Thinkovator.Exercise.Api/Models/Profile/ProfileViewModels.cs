using System;

namespace Thinkovator.Exercise.Api.Models.Profile
{
  public class ProfileViewModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
    public int Points { get; set; }
    public DateTime? LastWorkoutDate { get; set; }
    public bool IsAdmin { get; set; }
  }

  public class ProfileRewardsViewModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
  }
}