import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { WorkoutService } from './workout.service';
import { Workout } from './workout';

@IonicPage()
@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.component.html',
  providers: [WorkoutService]
})
export class WorkoutsPage implements OnInit {
  workouts: Array<Workout>;

  constructor(private service: WorkoutService,
    private loadingService: LoadingService,
    private nav: NavController) { }

  ngOnInit(): void {
    //this.getWorkouts();
  }

  workoutClicked(id: number, name: string): void {
    this.nav.push('WorkoutDetailPage', {
      id: id,
      name: name
    });
  }

  customWorkout(): void {
    this.nav.push('CustomWorkoutPage');
  }

  // private getWorkouts(): void {
  //   let profileId = +localStorage.getItem('profileId');
  //   this.service.getWorkouts(profileId).subscribe(res => {
  //     this.workouts = res;

  //     this.workouts.forEach(workout => {
  //       switch (workout.id) {
  //         case 1:
  //           workout.image = 'assets/images/strength.png';
  //           break;
  //         case 2:
  //           workout.image = 'assets/images/cardio.png';
  //           break;
  //         case 3:
  //           workout.image = 'assets/images/stretch.png';
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }
}

