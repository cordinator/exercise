import { Component, OnInit } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { ToggleMenuService } from '../../app/menu/toggle-menu.service';
import { MessagingService } from '../../app/shared/messaging/messaging.service';
import { Message, MessageType } from '../../app/shared/message-banner/message';

import { ProfileService } from './profile.service';
import { Profile } from './profile';

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.component.html',
  providers: [ProfileService]
})
export class ProfilesPage implements OnInit {
  items: Profile[];
  messages: Message[] = [];
  pointsMapping: { [k: string]: string } = { '=1': '# pt', 'other': '# pts' };

  constructor(private service: ProfileService,
    private loadingService: LoadingService,
    private toggleMenuService: ToggleMenuService,
    private messagingService: MessagingService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.toggleMenuService.toggleMenu(false);
    this.getProfiles();
  }

  profileSelected(event: any, profile: Profile): void {
    this.messages = [];

    if (profile.isAdmin) {
      this.displayAdminPin(profile);
    } else {
      this.cacheProfileInfo(profile);
      this.navigateToProfilePage(profile);
    }
  }

  private getProfiles() {
    this.service.getProfiles().subscribe(profiles => {
      this.items = profiles
    },
      err => {
        console.log(err);
      });
  }

  private displayAdminPin(profile: Profile): void {
    this.alertCtrl.create({
      title: 'Admin Selected',
      subTitle: 'Please enter Admin Pin',
      inputs: [
        {
          name: 'pin',
          placeholder: 'Admin Pin'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.service.validatePin(profile.id, data.pin).subscribe(res => {
              if (res) {
                this.cacheProfileInfo(profile);
                this.navigateToProfilePage(profile);
              } else {
                this.messages.push({type: MessageType.error, message: "Invalid Admin Pin"});
                this.loadingService.dismiss();
              }
            },
              error => {
                this.loadingService.dismissAll();
              });
          }
        }
      ]
    }).present();
  }
  
  private navigateToProfilePage(profile: Profile): void {
    this.toggleMenuService.toggleMenu(true);

    this.navCtrl.setRoot('ProfileDetailPage', {
      item: profile
    });
  }

  private cacheProfileInfo(profile: Profile): void {
    localStorage.setItem('name', profile.name);
    localStorage.setItem('isAdmin', profile.isAdmin.toString());
    localStorage.setItem('profileId', profile.id.toString());

    this.messagingService.profileChanged.next(profile);
  }
}
