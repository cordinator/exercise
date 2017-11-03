import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { RegisterPage } from './register.component';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  exports: [
    RegisterPage,
  ]
})
export class RegisterModule { }