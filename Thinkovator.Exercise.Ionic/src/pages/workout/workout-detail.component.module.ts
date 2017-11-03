import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutDetailPage } from './workout-detail.component';

@NgModule({
  declarations: [
    WorkoutDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutDetailPage),
  ],
  exports: [
    WorkoutDetailPage,
  ]
})
export class WorkoutDetailModule { }