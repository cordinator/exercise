import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'

import { BuyRewardsPage } from './buyRewards.component';

@NgModule({
  declarations: [
    BuyRewardsPage,
  ],
  imports: [
    MessageBannerModule,
    IonicPageModule.forChild(BuyRewardsPage),
  ],
  exports: [
    BuyRewardsPage,
  ]
})
export class BuyRewardsModule { }