import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { CustomWorkoutService } from './customWorkout.service';
import { CustomWorkout } from './customWorkout';

@IonicPage()
@Component({
  selector: 'page-customWorkout',
  templateUrl: 'customWorkout.component.html',
  providers: [CustomWorkoutService]
})
export class CustomWorkoutPage {
  constructor(private service: CustomWorkoutService,
    private loadingService: LoadingService,
    private nav: NavController,
    private alertCtrl: AlertController) { }
}

