using Thinkovator.Exercise.Core.Enums;

namespace Thinkovator.Exercise.Api.Models.Settings
{
  public class SettingsViewModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
    public Units? Units { get; set; }
  }
}