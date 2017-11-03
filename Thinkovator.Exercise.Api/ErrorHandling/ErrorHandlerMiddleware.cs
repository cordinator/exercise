using Microsoft.Owin;
using System;
using System.Threading.Tasks;

namespace Thinkovator.Exercise.Api.ErrorHandling
{
  public class ErrorHandlerMiddleware : OwinMiddleware
  {
    private static readonly log4net.ILog log
       = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

    public ErrorHandlerMiddleware(OwinMiddleware next) : base(next)
    {
    }

    public override async Task Invoke(IOwinContext context)
    {
      try
      {
        await Next.Invoke(context);
      }
      catch (Exception ex)
      {
        var exceptionId = Guid.NewGuid();
        log.Error($"Exception Id: [{exceptionId}]", ex);

        context.Response.StatusCode = 500;

        await context.Response.WriteAsync($"Exception Id: [{exceptionId}]");
      }
    }
  }
}