import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'
import { WorkoutService } from '../workout/workout.service';
import { Workout } from '../workout/workout';

import { HistoryService } from './history.service';
import { History, HistoryRequest } from './history';

@IonicPage()
@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.component.html',
  providers: [HistoryService, WorkoutService]
})
export class HistoryDetailPage implements OnInit {
  profileId: number;
  item: any = null;
  selectedDate: Date;
  editMode: boolean = false;
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];
  workouts: Workout[];

  constructor(private service: HistoryService,
    private workoutService: WorkoutService,
    private loadingService: LoadingService,
    private nav: NavController,
    private params: NavParams,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileId = +localStorage.getItem('profileId')
    this.item = this.params.get('item');
    this.selectedDate = this.params.get('selectedDate');
    this.editMode = this.item !== undefined;

    this.getWorkouts();
    this.buildForm();
  }

  save(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    let history = this.buildHistoryRequest();
    this.service.createWorkoutHistory(history).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem updating the workout.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem updating the workout.');
      });
  }

  update(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    let history = this.buildHistoryRequest();
    this.service.updateWorkoutHistory(history).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem updating the workout.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem updating the workout.');
      });
  }

  private getWorkouts(): void {
    this.workoutService.getWorkouts(this.profileId).subscribe(res => {
      this.workouts = res;
    },
      error => {

      });
  }

  private buildForm(): void {
    if (!this.item) {
      this.formGroup = this.formBuilder.group({
        workoutId: ['', Validators.compose([Validators.required])],
        workoutDate: [this.getWorkoutDate(), Validators.compose([Validators.required])],
        lengthInSeconds: ['', Validators.compose([Validators.required])],
      });
    }
    else {
      this.formGroup = this.formBuilder.group({
        workoutId: [this.item.workout.id, Validators.compose([Validators.required])],
        workoutDate: [this.getWorkoutDate(), Validators.compose([Validators.required])],
        lengthInSeconds: [this.getMinutes(), Validators.compose([Validators.required])],
        caloriesBurned: [this.item.caloriesBurned, Validators.compose([Validators.required])],
        pointsEarned: [this.item.pointsEarned, Validators.compose([Validators.required])],
      });
    }
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private buildHistoryRequest(): HistoryRequest {
    let history = {
      id: this.item ? this.item.id : null,
      profileId: this.profileId,
      workoutId: this.formGroup.controls.workoutId.value,
      lengthInSeconds: this.formGroup.controls.lengthInSeconds.value * 60,
      workoutDate: new Date(this.formGroup.controls.workoutDate.value)
    };

    return history;
  }

  private setMessage(type: MessageType, message: string): void {
    this.messages.push({ type: type, message: message });
  }

  private getWorkoutDate(): string {
    let date = new Date().toString();

    if (this.selectedDate) {
      date = this.selectedDate.toString();
    }

    if (this.item) {
      date = this.item.workoutDate;
    }

    return new Date(date).toISOString().slice(0, 10);
  }

  private getMinutes(): number {
    let minutes = this.item.lengthInSeconds / 60;
    return Math.round(minutes);
  }
}