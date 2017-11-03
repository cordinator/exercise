import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { ImagePage } from './image.component';

@NgModule({
  declarations: [
    ImagePage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(ImagePage),
  ],
  exports: [
    ImagePage,
  ]
})
export class ImageModule { }