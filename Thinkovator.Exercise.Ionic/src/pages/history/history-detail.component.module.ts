import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MessageBannerModule } from '../../app/shared/message-banner/message-banner.component.module'
import { InputErrorModule } from '../../app/shared/input-error/input-error.component.module'

import { HistoryDetailPage } from './history-detail.component';

@NgModule({
  declarations: [
    HistoryDetailPage,
  ],
  imports: [
    MessageBannerModule,
    InputErrorModule,
    IonicPageModule.forChild(HistoryDetailPage),
  ],
  exports: [
    HistoryDetailPage,
  ]
})
export class HistoryDetailModule { }