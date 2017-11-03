import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { SettingsPage } from './settings.component';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(SettingsPage),
  ],
  exports: [
    SettingsPage,
  ]
})
export class SettingsModule { }