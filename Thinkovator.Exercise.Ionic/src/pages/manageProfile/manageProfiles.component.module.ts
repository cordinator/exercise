import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageProfilesPage } from './manageProfiles.component';

@NgModule({
  declarations: [
    ManageProfilesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageProfilesPage),
  ],
  exports: [
    ManageProfilesPage,
  ]
})
export class ManageProfilesModule { }