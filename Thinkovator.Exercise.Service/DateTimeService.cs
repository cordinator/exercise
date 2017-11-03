using System;

namespace Thinkovator.Exercise.Service
{
  public interface IDateTimeService
  {
    DateTime UtcNow();
  }

  public class DateTimeService : IDateTimeService
  {
    public DateTime UtcNow()
    {
      return DateTime.UtcNow;
    }
  }
}
