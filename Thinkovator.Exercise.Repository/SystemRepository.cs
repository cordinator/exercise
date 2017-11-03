using System.Data.Entity;
using System.Threading.Tasks;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Repository.Context;

namespace Thinkovator.Exercise.Repository
{
  public interface ISystemRepository
  {
    Task<Version> Version();
  }

  public class SystemRepository : ISystemRepository
  {
    public async Task<Version> Version()
    {
      using(var context = new ExerciseContext())
      {
        return await context.Versions.FirstOrDefaultAsync() ?? new Version();
      }
    }
  }
}
