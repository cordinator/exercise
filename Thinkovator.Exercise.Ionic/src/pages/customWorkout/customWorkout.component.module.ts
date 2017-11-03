import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomWorkoutPage } from './customWorkout.component';

@NgModule({
  declarations: [
    CustomWorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomWorkoutPage),
  ],
  exports: [
    CustomWorkoutPage,
  ]
})
export class CustomWorkoutModule { }