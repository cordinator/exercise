import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { LoginPage } from './login.component';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage,
  ]
})
export class LoginModule { }