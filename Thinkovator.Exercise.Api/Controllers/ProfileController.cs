using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using core = Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Service;
using Thinkovator.Exercise.Api.Models.Profile;
using Thinkovator.Exercise.Api.Models.Workout;
using Thinkovator.Exercise.Api.Filters;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/Profile")]
  public class ProfileController : SecureController
  {
    private readonly IProfileService _profileService;
    private readonly IWorkoutService _workoutService;

    public ProfileController(IProfileService profileService, IWorkoutService workoutService)
    {
      _profileService = profileService;
      _workoutService = workoutService;
    }

    [HttpGet, Route("")]
    public async Task<IEnumerable<ProfileViewModel>> Get()
    {
      var profiles = await _profileService.Get(UserId);
      var results = Mapper.Map<IEnumerable<core.Profile>, List<ProfileViewModel>>(profiles);

      return results;
    }

    [HttpGet, Route("{id}")]
    public async Task<ProfileViewModel> Get(int id)
    {
      var profile = await _profileService.Get(UserId, id);
      if (profile == null)
        return new ProfileViewModel();
      
      var result = Mapper.Map<ProfileViewModel>(profile);

      return result;
    }

    [HttpGet, Route("{id}/validate/{pin}")]
    public async Task<bool> ValidatePin(int id, string pin)
    {
      var result = await _profileService.ValidatePin(UserId, id, pin);
      return result;
    }

    [HttpPost, Route(""), CustomAuthorize]
    public async Task<bool> Post(CreateProfileBindingModel model)
    {
      var profile = Mapper.Map<core.Profile>(model);

      var result = await _profileService.Create(UserId, profile);
      return result;
    }

    [HttpPut, Route("{id}"), CustomAuthorize]
    public async Task<bool> Put(int id, UpdateProfileBindingModel model)
    {
      var profile = Mapper.Map<core.Profile>(model);
      profile.Id = id;

      var result = await _profileService.Update(UserId, profile);
      return result;
    }

    [HttpDelete, Route("{id}"), CustomAuthorize]
    public async Task<bool> Delete(int id)
    {
      var result = await _profileService.Delete(UserId, id);
      return result;
    }

    [HttpGet, Route("{id}/rewards")]
    public async Task<IEnumerable<ProfileRewardsViewModel>> GetRewards(int id)
    {
      var profiles = await _profileService.GetRewards(UserId, id);
      var results = Mapper.Map<IEnumerable<core.Reward>, List<ProfileRewardsViewModel>>(profiles);

      return results;
    }

    [HttpPost, Route("{id}/rewards")]
    public async Task<bool> Post(int id, CreateProfileRewardBindingModel model)
    {
      var result = await _profileService.CreateReward(UserId, id, model.RewardId);
      return result;
    }

    [HttpDelete, Route("{id}/rewards/{rewardId}")]
    public async Task<bool> Delete(int id, int rewardId)
    {
      var result = await _profileService.DeleteReward(UserId, id, rewardId);
      return result;
    }


    [Route("{id}/workouts")]
    public async Task<IEnumerable<WorkoutViewModel>> GetWorkouts(int id)
    {
      var videos = await _workoutService.GetAll(UserId, id);

      var results = Mapper.Map<List<WorkoutViewModel>>(videos);
      return results;
    }

    [HttpPost, Route("{id}/sessions")]
    public async Task<bool> Sessions(int id, CreateProfileSessionsBindingModel model)
    {
      var session = Mapper.Map<CreateProfileSessionsBindingModel, core.Session>(model);

      var result = await _profileService.CreateSession(UserId, id, session);
      return result;
    }
  }
}