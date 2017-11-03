using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;
using Thinkovator.Exercise.Core.Models;

namespace Thinkovator.Exercise.Repository.Context
{
  public class ExerciseContext : DbContext
  {
    public ExerciseContext() : base("ApplicationContext")
    {
    }

    public DbSet<Core.Models.Version> Versions { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<RewardsBought> RewardsBought { get; set; }
    public DbSet<Reward> Rewards { get; set; }
    public DbSet<Video> Videos { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutHistory> WorkoutHistory { get; set; }
    public DbSet<WorkoutVideo> WorkoutVideos { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
      Database.SetInitializer(new ExerciseContextInitializer());

      modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
    }
  }

  public class ExerciseContextInitializer : DropCreateDatabaseIfModelChanges<ExerciseContext>
  {
    protected override void Seed(ExerciseContext context)
    {
      SeedWorkout(context);
      SeedVideos(context);
      SeedWorkoutVideo(context);
    }

    private void SeedWorkout(ExerciseContext context)
    {
      context.Workouts.AddOrUpdate(x => x.Id,
        new Workout
        {
          Id = 1,
          Name = "Strength",
          UserId = "-1",
          ProfileId = -1,
          Created = DateTime.UtcNow
        },
        new Workout
        {
          Id = 2,
          Name = "Cardio",
          UserId = "-1",
          ProfileId = -1,
          Created = DateTime.UtcNow
        },
        new Workout
        {
          Id = 3,
          Name = "Stretching",
          UserId = "-1",
          ProfileId = -1,
          Created = DateTime.UtcNow
        });
    }

    private void SeedVideos(ExerciseContext context)
    {
      context.Videos.AddOrUpdate(x => x.Id,
        new Video
        {
          Id = 1,
          Name = "pushups"
        },
        new Video
        {
          Id = 2,
          Name = "chair-pushups"
        },
        new Video
        {
          Id = 3,
          Name = "squats"
        },
        new Video
        {
          Id = 4,
          Name = "high-knees"
        },
        new Video
        {
          Id = 5,
          Name = "jumping-jacks"
        },
        new Video
        {
          Id = 6,
          Name = "jump-rope"
        },
        new Video
        {
          Id = 7,
          Name = "cat-stretch"
        },
        new Video
        {
          Id = 8,
          Name = "literally-cat-stretching"
        },
        new Video
        {
          Id = 9,
          Name = "carol-stretching"
        });
    }

    private void SeedWorkoutVideo(ExerciseContext context)
    {
      context.WorkoutVideos.AddOrUpdate(x => x.Id,
        new WorkoutVideo
        {
          Id = 1,
          WorkoutId = 1,
          VideoId = 1,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 2,
          WorkoutId = 1,
          VideoId = 2,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 3,
          WorkoutId = 1,
          VideoId = 3,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 4,
          WorkoutId = 2,
          VideoId = 4,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 5,
          WorkoutId = 2,
          VideoId = 5,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 6,
          WorkoutId = 2,
          VideoId = 6,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 7,
          WorkoutId = 3,
          VideoId = 7,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 8,
          WorkoutId = 3,
          VideoId = 8,
          Created = DateTime.UtcNow
        },
        new WorkoutVideo
        {
          Id = 9,
          WorkoutId = 3,
          VideoId = 9,
          Created = DateTime.UtcNow
        });
    }
  }
}
