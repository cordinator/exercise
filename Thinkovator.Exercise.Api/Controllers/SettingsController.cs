using AutoMapper;
using System.Threading.Tasks;
using System.Web.Http;
using Thinkovator.Exercise.Api.Models.Settings;
using Thinkovator.Exercise.Service;
using core = Thinkovator.Exercise.Core.Models;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/Settings")]
  public class SettingsController : SecureController
  {
    private readonly IProfileService _profileService;

    public SettingsController(IProfileService profileService)
    {
      _profileService = profileService;
    }

    [HttpGet, Route("{id}")]
    public async Task<SettingsViewModel> Get(int id)
    {
      var profile = await _profileService.Get(UserId, id);
      if (profile == null)
        return new SettingsViewModel();

      var result = Mapper.Map<SettingsViewModel>(profile);

      return result;
    }

    [HttpPut, Route("{id}")]
    public async Task<bool> Put(int id, UpdateSettingsBindingModel model)
    {
      var profile = Mapper.Map<core.Profile>(model);
      profile.Id = id;

      var result = await _profileService.Update(UserId, profile);
      return result;
    }
  }
}