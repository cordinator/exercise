import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { ManageRewardDetailPage } from './manageReward-detail.component';

@NgModule({
  declarations: [
    ManageRewardDetailPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(ManageRewardDetailPage),
  ],
  exports: [
    ManageRewardDetailPage,
  ]
})
export class ManageRewardDetailModule { }