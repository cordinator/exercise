import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { ChangePasswordPage } from './changePassword.component';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  exports: [
    ChangePasswordPage,
  ]
})
export class ChangePasswordModule { }