using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api.Filters
{
  public class CustomAuthorizeAttribute : AuthorizeAttribute
  {
    public override async Task OnAuthorizationAsync(HttpActionContext context, CancellationToken token)
    {
      var userId = context.RequestContext.Principal.Identity.GetUserId();

      IEnumerable<string> headerValues;
      if (context.Request.Headers.TryGetValues("profileId", out headerValues))
      {
        var idValue = headerValues.FirstOrDefault();

        int profileId;
        if (int.TryParse(idValue, out profileId))
        {

          var service = context.Request.GetDependencyScope().GetService(typeof(IProfileService)) as IProfileService;
          var profile = await service.Get(userId, profileId);
          if (!profile.IsAdmin)
          {
            Challenge(context);
            return;
          }
          await base.OnAuthorizationAsync(context, token);
        }
      }
      else
      {
        Challenge(context);
      }
    }

    private void Challenge(HttpActionContext actionContext)
    {
      var host = actionContext.Request.RequestUri.DnsSafeHost;
      actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
      actionContext.Response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", host));
    }
  }
}