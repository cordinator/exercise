using System.Threading.Tasks;
using System.Web.Http;
using Thinkovator.Exercise.Api.Models.System;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/System")]
  public class SystemController : ApiController
  {
    private readonly ISystemService _systemService;

    public SystemController(ISystemService systemService)
    {
      _systemService = systemService;
    }
    
    [HttpGet, Route("version")]
    public async Task<VersionViewModel> Version()
    {
      var version = await _systemService.Version();
      var result = AutoMapper.Mapper.Map<VersionViewModel>(version);

      return result;
    }

    [HttpGet, Route("logging")]
    public void TestLogging()
    {
      throw new System.Exception("Test Logging");
    }
  }
}