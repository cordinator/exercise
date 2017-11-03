import { Component, OnInit } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { WorkoutFinishedService } from './workoutFinished.service';
import { WorkoutFinished } from './workoutFinished';

@IonicPage()
@Component({
  selector: 'page-workoutFinished',
  templateUrl: 'workoutFinished.component.html',
  providers: [WorkoutFinishedService]
})
export class WorkoutFinishedPage implements OnInit {
  messages: Message[] = [];
  workoutFinished: WorkoutFinished;
  workoutLength: number;
  messageMapping: { [k: string]: string } = { '=1': '# min', 'other': '# mins' };

  constructor(private service: WorkoutFinishedService,
    private loadingService: LoadingService,
    private nav: NavController) {
  }

  ngOnInit(): void {
    this.getFinishedWorkout();
  }

  home(): void {
    this.nav.setRoot('ProfileDetailPage');
  }

  private getFinishedWorkout(): void {
    this.loadingService.showLoading();
    let profileId = +localStorage.getItem('profileId');
    this.service.getFinishedWorkout(profileId).subscribe(res => {
      this.workoutFinished = res;
      this.getWorkoutLength();
      this.loadingService.dismiss();
    },
      e => {
        this.setMessage(MessageType.error, "There was an error getting the last workout.")
        this.loadingService.dismissAll();
      });
  }

  private getWorkoutLength(): void {
    this.workoutLength = this.workoutFinished.lengthInSeconds / 60;
  }

  private setMessage(type: MessageType, message: string): void {
    this.messages.push({ type: type, message: message });
  }
}