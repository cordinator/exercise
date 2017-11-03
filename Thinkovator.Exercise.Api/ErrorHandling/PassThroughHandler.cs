using System.Runtime.ExceptionServices;
using System.Web.Http.ExceptionHandling;

namespace Thinkovator.Exercise.Api.ErrorHandling
{
  public class PassthroughHandler : ExceptionHandler
  {
    public override void Handle(ExceptionHandlerContext context)
    {
      var info = ExceptionDispatchInfo.Capture(context.Exception);
      info.Throw();
    }
  }
}