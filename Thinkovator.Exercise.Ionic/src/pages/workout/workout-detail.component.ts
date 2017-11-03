import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { WorkoutService } from './workout.service';
import { Workout } from './workout';

@IonicPage()
@Component({
  selector: 'page-workout-detail',
  templateUrl: 'workout-detail.component.html',
  providers: [WorkoutService]
})
export class WorkoutDetailPage implements OnInit {
  workoutId: number;
  workoutName: string;
  minutes: number = 5;
  increment: number = 5;

  constructor(private service: WorkoutService,
    private loadingService: LoadingService,
    private nav: NavController,
    private params: NavParams) { }

  ngOnInit(): void {
    this.workoutId = this.params.get('id');
    this.workoutName = this.params.get('name');
  }

  subtract(): void {
    if (this.minutes > 5) {
      this.minutes = this.minutes - this.increment;
    } else if (this.minutes > 1) {
      this.minutes = this.minutes - 1;
    }
  }

  add(): void {
    if (this.minutes < 5) {
      this.minutes = this.minutes + 1;
    } else {
      this.minutes = this.minutes + this.increment;
    }
  }

  begin(): void {
    this.nav.push('SessionPage', {
      workoutId: this.workoutId,
      minutes: this.minutes
    });
  }
}

