using AutoMapper;
using Thinkovator.Exercise.Api.Models.History;
using Thinkovator.Exercise.Api.Models.Profile;
using Thinkovator.Exercise.Api.Models.Reward;
using Thinkovator.Exercise.Api.Models.Settings;
using Thinkovator.Exercise.Api.Models.System;
using Thinkovator.Exercise.Api.Models.Workout;
using core = Thinkovator.Exercise.Core.Models;

namespace Thinkovator.Exercise.Api
{
  public static class AutoMapperConfig
  {
    public static void Register()
    {
      Mapper.Initialize(cfg =>
      {
        cfg.CreateMap<core.Profile, ProfileViewModel>();
        cfg.CreateMap<CreateProfileBindingModel, core.Profile>();
        cfg.CreateMap<UpdateProfileBindingModel, core.Profile>();
        
        cfg.CreateMap<core.Profile, SettingsViewModel>();
        cfg.CreateMap<UpdateSettingsBindingModel, core.Profile>();

        cfg.CreateMap<core.Reward, RewardViewModel>();
        cfg.CreateMap<core.Reward, ProfileRewardsViewModel>();
        cfg.CreateMap<CreateRewardBindingModel, core.Reward>();
        cfg.CreateMap<UpdateRewardBindingModel, core.Reward>();

        cfg.CreateMap<core.WorkoutHistory, ExerciseHistoryViewModel>()
           .ForMember(dest => dest.Workout, 
                      opt => opt.MapFrom(src => new Core.Models.Workout { Id = src.WorkoutId, Name = src.WorkoutName }));
        cfg.CreateMap<core.WorkoutHistory, LatestWorkoutViewModel>();
        cfg.CreateMap<CreateWorkoutHistoryBindingModel, core.WorkoutHistory>();
        cfg.CreateMap<UpdateWorkoutHistoryBindingModel, core.WorkoutHistory>();

        cfg.CreateMap<CreateProfileSessionsBindingModel, core.Session>();

        cfg.CreateMap<core.Workout, WorkoutViewModel>();

        cfg.CreateMap<core.Version, VersionViewModel>()
           .ForMember(dest => dest.AssemblyVersion, opt => opt.MapFrom(src => src.Id));
      });
    }
  }
}