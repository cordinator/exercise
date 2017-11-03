import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'

import { InputErrorComponent } from './input-error.component';

@NgModule({
  declarations: [
    InputErrorComponent,
  ],
  imports: [
    IonicPageModule.forChild(InputErrorComponent),
  ],
  exports: [
    InputErrorComponent,
  ]
})
export class InputErrorModule { }