import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'

import { MessageBannerComponent } from './message-banner.component';

@NgModule({
  declarations: [
    MessageBannerComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessageBannerComponent),
  ],
  exports: [
    MessageBannerComponent,
  ]
})
export class MessageBannerModule { }