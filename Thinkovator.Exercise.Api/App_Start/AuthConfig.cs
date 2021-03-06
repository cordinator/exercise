﻿using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using Thinkovator.Exercise.Api.Managers;
using Thinkovator.Exercise.Api.Models.Account;
using Thinkovator.Exercise.Api.Providers;

namespace Thinkovator.Exercise.Api
{
  public static class AuthConfig
  {
    public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

    public static string PublicClientId { get; private set; }

    public static IAppBuilder UseOAuth(this IAppBuilder app)
    {
      // Configure the db context and user manager to use a single instance per request
      app.CreatePerOwinContext(ApplicationDbContext.Create);
      app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

      // Enable the application to use a cookie to store information for the signed in user
      // and to use a cookie to temporarily store information about a user logging in with a third party login provider
      app.UseCookieAuthentication(new CookieAuthenticationOptions());
      app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

      // Configure the application for OAuth based flow
      PublicClientId = "self";
      OAuthOptions = new OAuthAuthorizationServerOptions
      {
        TokenEndpointPath = new PathString("/api/OAuth/Token"),
        Provider = new ApplicationOAuthProvider(PublicClientId),
        AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
        AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
        AllowInsecureHttp = true
      };

      // Enable the application to use bearer tokens to authenticate users
      app.UseOAuthBearerTokens(OAuthOptions);

      // Uncomment the following lines to enable logging in with third party login providers
      //app.UseMicrosoftAccountAuthentication(
      //    clientId: "",
      //    clientSecret: "");

      //app.UseTwitterAuthentication(
      //    consumerKey: "",
      //    consumerSecret: "");

      //app.UseFacebookAuthentication(
      //    appId: "",
      //    appSecret: "");

      //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
      //{
      //    ClientId = "",
      //    ClientSecret = ""
      //});

      return app;
    }
  }
}