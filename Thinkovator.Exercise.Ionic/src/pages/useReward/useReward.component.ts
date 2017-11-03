import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { UseRewardService } from './useReward.service';
import { UseReward } from './useReward';

@IonicPage()
@Component({
  selector: 'page-useReward',
  templateUrl: 'useReward.component.html',
  providers: [UseRewardService]
})
export class UseRewardPage implements OnInit {
  profileId: number;
  items: UseReward[];
  itemsExist: boolean = false;

  constructor(private service: UseRewardService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.profileId = +localStorage.getItem('profileId');
    this.getRewards();
  }

  ionViewWillEnter(): void {
    this.getRewards();
  }

  use(item: UseReward): void {
    let prompt = this.alertCtrl.create({
      title: 'Use Reward',
      subTitle: `Are you sure you wish to use ${item.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Use',
          handler: data => {
            this.loadingService.showLoading()
            this.service.useReward(this.profileId, item.id).subscribe(success => {
              this.items = this.items.filter(f => f.id !== item.id);
              
              this.checkIfItemsExist();

              this.loadingService.dismiss();
            },
              error => {
                this.loadingService.dismiss();
              });
          }
        }
      ]
    });
    prompt.present();
  }

  buyRewards(): void {
    this.navCtrl.push('BuyRewardsPage');
  }

  private getRewards(): void {
    this.service.getRewards(this.profileId).subscribe(rewards => {
      // TODO(darends): Group rewards based on id.  Refactore server side code to 
      // allow for deleting the first reward matching this reward id, profile id, 
      // and is not already deleted
      this.items = rewards
      this.checkIfItemsExist();
    },
      err => {
        console.log(err);
      });
  }

  private checkIfItemsExist(): void {
    this.itemsExist = this.items && this.items.length > 0 ? true : false;
  }
}
