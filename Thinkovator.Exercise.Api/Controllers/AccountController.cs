using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Thinkovator.Exercise.Api.Models.Account;
using Thinkovator.Exercise.Api.Providers;
using Thinkovator.Exercise.Api.Results;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api.Controllers
{
  [RoutePrefix("api/v1/Account")]
  public class AccountController : SecureController
  {
    private const string LocalLoginProvider = "Local";

    private readonly IEmailService _emailService;
    private readonly IProfileService _profileService;
    private readonly IAccessTokenFormatProvider _accessTokenFormat;
    
    public AccountController(IEmailService emailService, IProfileService profileService, IAccessTokenFormatProvider accessTokenFormat)
    {
      _emailService = emailService;
      _profileService = profileService;
      _accessTokenFormat = accessTokenFormat;
    }

    // GET api/Account/UserInfo
    [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
    [Route("UserInfo")]
    public UserInfoViewModel GetUserInfo()
    {
      var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

      return new UserInfoViewModel
      {
        Email = User.Identity.GetUserName(),
        HasRegistered = externalLogin == null,
        LoginProvider = externalLogin?.LoginProvider
      };
    }

    // POST api/Account/Logout
    [Route("Logout")]
    public IHttpActionResult Logout()
    {
      Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
      return Ok();
    }

    // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
    [Route("ManageInfo")]
    public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
    {
      var user = await UserManager.FindByIdAsync(UserId);
      if (user == null)
      {
        return null;
      }

      List<UserLoginInfoViewModel> logins = new List<UserLoginInfoViewModel>();

      foreach (IdentityUserLogin linkedAccount in user.Logins)
      {
        logins.Add(new UserLoginInfoViewModel
        {
          LoginProvider = linkedAccount.LoginProvider,
          ProviderKey = linkedAccount.ProviderKey
        });
      }

      if (user.PasswordHash != null)
      {
        logins.Add(new UserLoginInfoViewModel
        {
          LoginProvider = LocalLoginProvider,
          ProviderKey = user.UserName,
        });
      }

      return new ManageInfoViewModel
      {
        LocalLoginProvider = LocalLoginProvider,
        Email = user.UserName,
        Logins = logins,
        ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
      };
    }

    // PUT api/Account/ChangePassword
    [HttpPut]
    [Route("ChangePassword")]
    public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var result = await UserManager.ChangePasswordAsync(UserId, model.OldPassword, model.NewPassword);
      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      return Ok();
    }

    // POST api/Account/ForgotPassword
    [AllowAnonymous]
    [Route("ForgotPassword")]
    public async Task<IHttpActionResult> ForgotPassword(ForgotPasswordBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var user = await UserManager.FindByEmailAsync(model.Email);
      if(user == null)
      {
        return BadRequest();
      }

      var token = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
      var callbackUri = $"{ConfigurationManager.AppSettings["resetPasswordUri"]}/resetToken/{token}";

      _emailService.Destination = model.Email;
      UserManager.EmailService = _emailService;
      var content = new StringBuilder();

      content.Append($"We received a request to reset your password. If this was not done by you please contact us at {ConfigurationManager.AppSettings["resetPasswordContact"]}.");
      content.Append($" If it was you who requested the reset please click the following link. <a href=\"{callbackUri}\">Reset Password</a>");
      content.Append($" <br/> If the link does not work copy and paste the following url: <br/><br/> {callbackUri}");

      await UserManager.SendEmailAsync(user.Id, "Password Reset Request", content.ToString());

      return Ok();
    }

    // POST api/Account/ResetPassword
    [Route("ResetPassword")]
    public async Task<IHttpActionResult> ResetPassword(ResetPasswordBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var user = await UserManager.FindByEmailAsync(model.Email);
      if (user == null)
      {
        return null;
      }

      var result = await UserManager.ResetPasswordAsync(user.Id, model.Token, model.NewPassword);
      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      return Ok();
    }

    // POST api/Account/AddExternalLogin
    [Route("AddExternalLogin")]
    public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

      var ticket = _accessTokenFormat.Unprotect(model.ExternalAccessToken);

      if (ticket == null || ticket.Identity == null || (ticket.Properties != null
          && ticket.Properties.ExpiresUtc.HasValue
          && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
      {
        return BadRequest("External login failure.");
      }

      var externalData = ExternalLoginData.FromIdentity(ticket.Identity);

      if (externalData == null)
      {
        return BadRequest("The external login is already associated with an account.");
      }

      var result = await UserManager.AddLoginAsync(UserId,
          new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      return Ok();
    }

    // POST api/Account/RemoveLogin
    [Route("RemoveLogin")]
    public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      IdentityResult result;

      if (model.LoginProvider == LocalLoginProvider)
      {
        result = await UserManager.RemovePasswordAsync(UserId);
      }
      else
      {
        result = await UserManager.RemoveLoginAsync(UserId,
            new UserLoginInfo(model.LoginProvider, model.ProviderKey));
      }

      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      return Ok();
    }

    // GET api/Account/ExternalLogin
    [OverrideAuthentication]
    [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
    [AllowAnonymous]
    [Route("ExternalLogin", Name = "ExternalLogin")]
    public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
    {
      if (error != null)
      {
        return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
      }

      if (!User.Identity.IsAuthenticated)
      {
        return new ChallengeResult(provider, this);
      }

      var externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);
      if (externalLogin == null)
      {
        return InternalServerError();
      }

      if (externalLogin.LoginProvider != provider)
      {
        Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
        return new ChallengeResult(provider, this);
      }

      var user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
          externalLogin.ProviderKey));

      bool hasRegistered = user != null;

      if (hasRegistered)
      {
        Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

        var oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager, OAuthDefaults.AuthenticationType);
        var cookieIdentity = await user.GenerateUserIdentityAsync(UserManager, CookieAuthenticationDefaults.AuthenticationType);

        var properties = ApplicationOAuthProvider.CreateProperties(user.UserName);
        Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
      }
      else
      {
        var claims = externalLogin.GetClaims();
        var identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
        Authentication.SignIn(identity);
      }

      return Ok();
    }

    // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
    [AllowAnonymous]
    [Route("ExternalLogins")]
    public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
    {
      IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();
      List<ExternalLoginViewModel> logins = new List<ExternalLoginViewModel>();

      string state;

      if (generateState)
      {
        const int strengthInBits = 256;
        state = RandomOAuthStateGenerator.Generate(strengthInBits);
      }
      else
      {
        state = null;
      }

      foreach (AuthenticationDescription description in descriptions)
      {
        ExternalLoginViewModel login = new ExternalLoginViewModel
        {
          Name = description.Caption,
          Url = Url.Route("ExternalLogin", new
          {
            provider = description.AuthenticationType,
            response_type = "token",
            client_id = AuthConfig.PublicClientId,
            redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
            state = state
          }),
          State = state
        };
        logins.Add(login);
      }

      return logins;
    }

    // POST api/Account/Register
    [AllowAnonymous]
    [Route("Register")]
    public async Task<IHttpActionResult> Register(RegisterBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var applicationUser = new ApplicationUser() { UserName = model.Email, Email = model.Email };

      var result = await UserManager.CreateAsync(applicationUser, model.Password);
      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      var user = await UserManager.FindByEmailAsync(applicationUser.Email);

      var profileCreated = await _profileService.Create(user.Id, new Core.Models.Profile { Name = model.Name, Pin = model.Pin, IsAdmin = true });
      if (!profileCreated)
      {
        return GetErrorResult(null);
      }

      return Ok();
    }

    // POST api/Account/RegisterExternal
    [OverrideAuthentication]
    [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
    [Route("RegisterExternal")]
    public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var info = await Authentication.GetExternalLoginInfoAsync();
      if (info == null)
      {
        return InternalServerError();
      }

      var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

      var result = await UserManager.CreateAsync(user);
      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }

      result = await UserManager.AddLoginAsync(user.Id, info.Login);
      if (!result.Succeeded)
      {
        return GetErrorResult(result);
      }
      return Ok();
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        UserManager.Dispose();
      }

      base.Dispose(disposing);
    }

    #region Helpers

    private IAuthenticationManager Authentication
    {
      get { return Request.GetOwinContext().Authentication; }
    }

    private IHttpActionResult GetErrorResult(IdentityResult result)
    {
      if (result == null)
      {
        return InternalServerError();
      }

      if (!result.Succeeded)
      {
        if (result.Errors != null)
        {
          foreach (string error in result.Errors)
          {
            ModelState.AddModelError("", error);
          }
        }

        if (ModelState.IsValid)
        {
          // No ModelState errors are available to send, so just return an empty BadRequest.
          return BadRequest();
        }

        return BadRequest(ModelState);
      }

      return null;
    }

    private class ExternalLoginData
    {
      public string LoginProvider { get; set; }
      public string ProviderKey { get; set; }
      public string UserName { get; set; }

      public IList<Claim> GetClaims()
      {
        IList<Claim> claims = new List<Claim>();
        claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

        if (UserName != null)
        {
          claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
        }

        return claims;
      }

      public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
      {
        if (identity == null)
        {
          return null;
        }

        Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

        if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
            || String.IsNullOrEmpty(providerKeyClaim.Value))
        {
          return null;
        }

        if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
        {
          return null;
        }

        return new ExternalLoginData
        {
          LoginProvider = providerKeyClaim.Issuer,
          ProviderKey = providerKeyClaim.Value,
          UserName = identity.FindFirstValue(ClaimTypes.Name)
        };
      }
    }

    private static class RandomOAuthStateGenerator
    {
      private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

      public static string Generate(int strengthInBits)
      {
        const int bitsPerByte = 8;

        if (strengthInBits % bitsPerByte != 0)
        {
          throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
        }

        int strengthInBytes = strengthInBits / bitsPerByte;

        byte[] data = new byte[strengthInBytes];
        _random.GetBytes(data);
        return HttpServerUtility.UrlTokenEncode(data);
      }
    }

    #endregion
  }
}