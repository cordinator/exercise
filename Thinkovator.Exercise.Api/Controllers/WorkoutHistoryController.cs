using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Thinkovator.Exercise.Api.Models.History;
using Thinkovator.Exercise.Service;
using core = Thinkovator.Exercise.Core.Models;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/WorkoutHistory")]
  public class WorkoutHistoryController : SecureController
  {
    private readonly IWorkoutHistoryService _workoutHistoryService;

    public WorkoutHistoryController(IWorkoutHistoryService workoutHistoryService)
    {
      _workoutHistoryService = workoutHistoryService;
    }

    [HttpGet, Route("profile/{profileId}")]
    public async Task<IEnumerable<ExerciseHistoryViewModel>> Get(int profileId)
    {
      var historyItems = await _workoutHistoryService.Get(UserId, profileId);
      var results = Mapper.Map<IEnumerable<core.WorkoutHistory>, List<ExerciseHistoryViewModel>>(historyItems);

      return results;
    }

    [HttpPost, Route("")]
    public async Task<bool> Post(CreateWorkoutHistoryBindingModel model)
    {
      var history = Mapper.Map<core.WorkoutHistory>(model);

      var result = await _workoutHistoryService.Create(UserId, history);
      return result;
    }

    [HttpPut, Route("{id}")]
    public async Task<bool> Put(int id, UpdateWorkoutHistoryBindingModel model)
    {
      var history = Mapper.Map<core.WorkoutHistory>(model);
      history.Id = id;

      var result = await _workoutHistoryService.Update(UserId, history);
      return result;
    }

    [HttpDelete, Route("profile/{profileId}/history/{id}")]
    public async Task<bool> Delete(int profileId, int id)
    {
      var result = await _workoutHistoryService.Delete(UserId, profileId, id);
      return result;
    }

    [HttpGet, Route("profile/{profileId}/latest")]
    public async Task<LatestWorkoutViewModel> GetLatestWorkout(int profileId)
    {
      var historyItem = await _workoutHistoryService.GetLatest(UserId, profileId);
      var result = Mapper.Map<core.WorkoutHistory, LatestWorkoutViewModel>(historyItem);

      return result;
    }

    [HttpGet, Route("profile/{profileId}/top/{quantity}")]
    public async Task<IEnumerable<LatestWorkoutViewModel>> GetLatestWorkout(int profileId, int? quantity)
    {
      var historyItem = await _workoutHistoryService.Top(UserId, profileId, quantity);
      var results = Mapper.Map<IEnumerable<core.WorkoutHistory>, IEnumerable<LatestWorkoutViewModel>>(historyItem);

      return results;
    }
  }
}