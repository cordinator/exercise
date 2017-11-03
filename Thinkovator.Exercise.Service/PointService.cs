using System;
using System.Threading.Tasks;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface IPointService
  {
    int CalculatePoints(int lengthInSeconds);
    Task<bool> UpdatePoints(string userId, int profileId, int lengthInSeconds);
  }

  public class PointService : IPointService
  {
    private readonly IProfileRepository _profileRepository;

    public PointService(IProfileRepository profileRepository)
    {
      _profileRepository = profileRepository;
    }

    public int CalculatePoints(int lengthInSeconds)
    {
      return (lengthInSeconds / 60);
    }

    public async Task<bool> UpdatePoints(string userId, int profileId, int lengthInSeconds)
    {
      var profile = await _profileRepository.Get(userId, profileId);
      if (profile == null)
        return false;

      profile.Points = profile.Points + CalculatePoints(lengthInSeconds);

      var results = await _profileRepository.UpdatePoints(profile);
      return results;
    }
  }
}
