import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { ForgotPasswordPage } from './forgotPassword.component';

@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(ForgotPasswordPage),
  ],
  exports: [
    ForgotPasswordPage,
  ]
})
export class ForgotPasswordModule { }