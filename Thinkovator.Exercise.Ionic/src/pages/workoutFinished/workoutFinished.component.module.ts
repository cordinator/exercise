import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'

import { WorkoutFinishedPage } from './workoutFinished.component';

@NgModule({
  declarations: [
    WorkoutFinishedPage,
  ],
  imports: [
    MessageBannerModule,
    IonicPageModule.forChild(WorkoutFinishedPage),
  ],
  exports: [
    WorkoutFinishedPage,
  ]
})
export class WorkoutFinishedModule { }