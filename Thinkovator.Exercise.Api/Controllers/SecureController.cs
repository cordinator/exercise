using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Web.Http;
using Thinkovator.Exercise.Api.Managers;

namespace Thinkovator.Exercise.Api.Controllers
{
  [Authorize]
  public class SecureController : ApiController
  {
    public string UserId
    {
      get
      {
        return User.Identity.GetUserId();
      }
    }

    public ApplicationUserManager UserManager
    {
      get
      {
        return Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
      }
    }
  }
}