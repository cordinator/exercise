using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Thinkovator.Exercise.Api.ErrorHandling;

namespace Thinkovator.Exercise.Api
{
  public class ExceptionConfig
  {
    public static void Register(HttpConfiguration config)
    {
      config.Services.Replace(typeof(IExceptionHandler), new PassthroughHandler());
    }
  }
}