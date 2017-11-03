using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;
using System.Web.Http;
using Thinkovator.Exercise.Repository;
using Thinkovator.Exercise.Service;

namespace Thinkovator.Exercise.Api
{
  public static class SimpleInjectorConfig
  {
    public static void Register(HttpConfiguration config)
    {
      var container = new Container();
      container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
      
      container.Register<IAccessTokenFormatProvider, AccessTokenFormatProvider>(Lifestyle.Scoped);
      container.Register<ICalorieService, CalorieService>(Lifestyle.Scoped);
      container.Register<IDateTimeService, DateTimeService>(Lifestyle.Scoped);
      container.Register<IEmailService, EmailService>(Lifestyle.Scoped);
      container.Register<IWorkoutHistoryRepository, WorkoutHistoryRepository>(Lifestyle.Scoped);
      container.Register<IWorkoutHistoryService, WorkoutHistoryService>(Lifestyle.Scoped);
      container.Register<IPointService, PointService>(Lifestyle.Scoped);
      container.Register<IProfileRepository, ProfileRepository>(Lifestyle.Scoped);
      container.Register<IProfileService, ProfileService>(Lifestyle.Scoped);
      container.Register<IRewardRepository, RewardRepository>(Lifestyle.Scoped);
      container.Register<IRewardService, RewardService>(Lifestyle.Scoped);
      container.Register<IWorkoutRepository, WorkoutRepository>(Lifestyle.Scoped);
      container.Register<IWorkoutService, WorkoutService>(Lifestyle.Scoped);
      container.Register<ISystemRepository, SystemRepository>(Lifestyle.Scoped);
      container.Register<ISystemService, SystemService>(Lifestyle.Scoped);

      container.RegisterWebApiControllers(config);

      container.Verify();

      config.DependencyResolver =
        new SimpleInjectorWebApiDependencyResolver(container);
    }
  }
}