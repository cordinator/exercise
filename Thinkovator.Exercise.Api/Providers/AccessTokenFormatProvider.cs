using Microsoft.Owin.Security;
using System;

namespace Thinkovator.Exercise.Api
{
  public interface IAccessTokenFormatProvider : ISecureDataFormat<AuthenticationTicket> { }

  public class AccessTokenFormatProvider : IAccessTokenFormatProvider
  {
    public string Protect(AuthenticationTicket data)
    {
      throw new NotImplementedException();
    }

    public AuthenticationTicket Unprotect(string protectedText)
    {
      throw new NotImplementedException();
    }
  }
}