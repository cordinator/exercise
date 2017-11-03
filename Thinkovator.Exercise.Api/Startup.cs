using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;
using Thinkovator.Exercise.Api.ErrorHandling;

[assembly: OwinStartup(typeof(Thinkovator.Exercise.Api.Startup))]
namespace Thinkovator.Exercise.Api
{
  public class Startup
  {
    public void Configuration(IAppBuilder app)
    {
      HttpConfiguration config = new HttpConfiguration();

      AutoMapperConfig.Register();

      ExceptionConfig.Register(config);
      SimpleInjectorConfig.Register(config);
      FormatterConfig.Register(config);
      SwaggerConfig.Register(config);
      WebApiConfig.Register(config);

      app.Use<ErrorHandlerMiddleware>()
         .UseCors(CorsOptions.AllowAll)
         .UseOAuth()
         .UseWebApi(config);
    }
  }
}
