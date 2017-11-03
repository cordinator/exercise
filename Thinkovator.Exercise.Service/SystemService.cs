using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository;

namespace Thinkovator.Exercise.Service
{
  public interface ISystemService
  {
    Task<Version> Version();
  }

  public class SystemService : ISystemService
  {
    private readonly ISystemRepository _systemRepository;

    public SystemService(ISystemRepository systemRepository)
    {
      _systemRepository = systemRepository;
    }

    public async Task<Version> Version()
    {
      return await _systemRepository.Version();
    }
  }
}
