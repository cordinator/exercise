import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'

import { ProfilesPage } from './profiles.component';

@NgModule({
  declarations: [
    ProfilesPage,
  ],
  imports: [
    MessageBannerModule,
    IonicPageModule.forChild(ProfilesPage),
  ],
  exports: [
    ProfilesPage,
  ]
})
export class ProfilesModule { }