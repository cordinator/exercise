namespace Thinkovator.Exercise.Service
{
  public interface ICalorieService
  {
    int CalculateCaloriesBurned(int lengthInSeconds);
  }

  public class CalorieService : ICalorieService
  {
    public int CalculateCaloriesBurned(int lengthInSeconds)
    {
      return 100;
    }
  }
}
