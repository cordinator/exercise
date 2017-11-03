using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/workouts")]
  public class WorkoutController : SecureController
  {
    private readonly IWorkoutService _workoutService;

    public WorkoutController(IWorkoutService workoutService)
    {
      _workoutService = workoutService;
    }
    
    [Route("{id}/videos")]
    public async Task<IEnumerable<string>> GetVideos(int id)
    {
      var videos = await _workoutService.GetVideos(UserId, id);
      return videos;
    }
  }
}