namespace Thinkovator.Exercise.Api.Models.Reward
{
  public class BaseRewardBindingModel
  {
    public string Name { get; set; }
    public string Description { get; set; }
    public int Points { get; set; }
  }

  public class CreateRewardBindingModel : BaseRewardBindingModel
  {
  }

  public class UpdateRewardBindingModel : BaseRewardBindingModel
  {
  }
}