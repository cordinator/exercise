namespace Thinkovator.Exercise.Api.Models.Profile
{
  public class ProfileBaseBindingModel
  {
    public string Name { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
  }

  public class CreateProfileBindingModel : ProfileBaseBindingModel
  {
  }

  public class UpdateProfileBindingModel : ProfileBaseBindingModel
  {
  }

  public class CreateProfileRewardBindingModel
  {
    public int RewardId { get; set; }
  }

  public class CreateProfileSessionsBindingModel
  {
    public int WorkoutId { get; set; }
    public int LengthInSeconds { get; set; }
  }
}