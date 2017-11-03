import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { BuyRewardsService } from './buyRewards.service';
import { BuyReward } from './buyReward';

@IonicPage()
@Component({
  selector: 'page-buyRewards',
  templateUrl: 'buyRewards.component.html',
  providers: [BuyRewardsService]
})
export class BuyRewardsPage implements OnInit {
  points: number;
  items: BuyReward[];
  itemsExist: boolean = false;
  messages: Message[];

  constructor(private service: BuyRewardsService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.getProfilePoints();
    this.getRewards();
  }

  buy(item: BuyReward): void {
    let prompt = this.alertCtrl.create({
      title: 'Buy Reward',
      subTitle: `Are you sure you wish to buy ${item.name} for ${item.points}pts?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Buy',
          handler: data => {
            this.messages = [];
            if (this.points < item.points) {
              this.messages.push({ type: MessageType.error, message: 'Not enough points' });
              return;
            }

            this.loadingService.showLoading();

            let profileId = +localStorage.getItem('profileId');
            this.points = this.points - item.points;

            localStorage.setItem('points', this.points.toString());

            this.service.buyReward(profileId, item.id).subscribe(success => {
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

  private getProfilePoints(): void {
    this.points = +localStorage.getItem('points');
  }

  private getRewards(): void {
    this.service.getRewards().subscribe(rewards => {
      this.items = rewards
      this.itemsExist = this.items && this.items.length > 0 ? true : false;
    },
      err => {
        console.log(err);
      });
  }
}
