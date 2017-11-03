using System;

namespace Thinkovator.Exercise.Core.Models
{
  public class Base
  {
    public int Id { get; set; }
    public string UserId { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public DateTime? Deleted { get; set; }
  }
}
