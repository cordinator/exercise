import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { ManageProfileService } from './manageProfile.service';
import { ManageProfile } from './manageProfile';

@IonicPage()
@Component({
  selector: 'page-manageProfiles',
  templateUrl: 'manageProfiles.component.html',
  providers: [ManageProfileService]
})
export class ManageProfilesPage implements OnInit {
  items: ManageProfile[];
  success: boolean = false;

  constructor(private service: ManageProfileService,
    private loadingService: LoadingService,
    private nav: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
  }

  ionViewDidEnter(): void {
    this.getProfiles();
  }

  create(): void {
    this.nav.push('ManageProfileDetailPage');
  }

  update(item: ManageProfile): void {
    this.nav.push('ManageProfileDetailPage', {
      item: item
    });
  }

  delete(idx, item: ManageProfile): void {
    this.alertCtrl.create({
      title: 'Delete Profile',
      subTitle: `Are you sure you wish to delete ${item.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            this.loadingService.showLoading()
            this.service.deleteProfile(item.id).subscribe(success => {
              if (success) {
                this.items.splice(idx, 1);
              }
              this.loadingService.dismiss();
            },
              error => {
                this.loadingService.dismiss();
              });
          }
        }
      ]
    }).present();
  }

  private getProfiles(): void {
    this.service.getProfiles().subscribe(profiles => {
      this.items = profiles
    },
      err => {
        console.log(err);
      });
  }
}