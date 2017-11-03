import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { ManageProfileDetailPage } from './manageProfile-detail.component';

@NgModule({
  declarations: [
    ManageProfileDetailPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(ManageProfileDetailPage),
  ],
  exports: [
    ManageProfileDetailPage,
  ]
})
export class ManageProfileDetailModule { }