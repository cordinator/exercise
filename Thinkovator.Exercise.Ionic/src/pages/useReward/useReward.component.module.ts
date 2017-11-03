import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UseRewardPage } from './useReward.component';

@NgModule({
  declarations: [
    UseRewardPage,
  ],
  imports: [
    IonicPageModule.forChild(UseRewardPage),
  ],
  exports: [
    UseRewardPage,
  ]
})
export class UseRewardModule { }