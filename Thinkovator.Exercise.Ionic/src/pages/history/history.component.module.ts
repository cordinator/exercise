import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarModule } from 'angular-calendar';

import { HistoryPage } from './history.component';

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    CalendarModule.forRoot(),
    IonicPageModule.forChild(HistoryPage),
  ],
  exports: [
    HistoryPage,
  ]
})
export class HistoryModule { }