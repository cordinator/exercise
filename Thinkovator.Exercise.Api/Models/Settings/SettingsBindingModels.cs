using Thinkovator.Exercise.Core.Enums;

namespace Thinkovator.Exercise.Api.Models.Settings
{
  public class SettingsBaseBindingModel
  {
    public string Name { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
    public Units? Units { get; set; }
  }

  public class UpdateSettingsBindingModel : SettingsBaseBindingModel
  {
  }
}