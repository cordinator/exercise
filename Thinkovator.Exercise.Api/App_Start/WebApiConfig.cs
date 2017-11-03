using Microsoft.Owin.Security.OAuth;
using System.Web.Http;

namespace Thinkovator.Exercise.Api
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      config.SuppressDefaultHostAuthentication();
      config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

      config.MapHttpAttributeRoutes();

      //config.Filters.Add(new Thinkovator.Exercise.Api.Filters.RequireHttpsAttribute());
    }
  }
}
