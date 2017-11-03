using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Thinkovator.Exercise.Api.Filters;
using Thinkovator.Exercise.Api.Models.Reward;
using Thinkovator.Exercise.Core.Models;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/Reward")]
  public class RewardController : SecureController
  {
    private readonly IRewardService _rewardService;

    public RewardController(IRewardService rewardService)
    {
      _rewardService = rewardService;
    }

    [HttpGet, Route("")]
    public async Task<IEnumerable<RewardViewModel>> Get()
    {
      var rewards = await _rewardService.Get(UserId);
      var results = Mapper.Map<IEnumerable<Reward>, List<RewardViewModel>>(rewards);

      return results;
    }

    [HttpGet, Route("{id}")]
    public async Task<RewardViewModel> Get(int id)
    {
      var reward = await _rewardService.Get(UserId, id);
      var result = Mapper.Map<RewardViewModel>(reward);

      return result;
    }

    [HttpPost, Route(""), CustomAuthorize]
    public async Task<bool> Post(CreateRewardBindingModel model)
    {
      var reward = Mapper.Map<Reward>(model);

      var result = await _rewardService.Create(UserId, reward);
      return result;
    }

    [HttpPut, Route("{id}"), CustomAuthorize]
    public async Task<bool> Put(int id, UpdateRewardBindingModel model)
    {
      var reward = Mapper.Map<Reward>(model);
      reward.Id = id;

      var result = await _rewardService.Update(UserId, reward);
      return result;
    }

    [HttpDelete, Route("{id}"), CustomAuthorize]
    public async Task<bool> Delete(int id)
    {
      var result = await _rewardService.Delete(UserId, id);
      return result;
    }
  }
}