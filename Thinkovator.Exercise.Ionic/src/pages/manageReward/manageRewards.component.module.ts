import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageRewardsPage } from './manageRewards.component';

@NgModule({
  declarations: [
    ManageRewardsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageRewardsPage),
  ],
  exports: [
    ManageRewardsPage,
  ]
})
export class ManageRewardsModule { }