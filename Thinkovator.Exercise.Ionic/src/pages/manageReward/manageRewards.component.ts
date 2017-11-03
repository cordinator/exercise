import { Component, OnInit } from '@angular/core';
import { I18nPluralPipe } from '@angular/common';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { ManageRewardService } from './manageReward.service';
import { ManageReward } from './manageReward';

@IonicPage()
@Component({
  selector: 'page-manageRewards',
  templateUrl: 'manageRewards.component.html',
  providers: [ManageRewardService]
})
export class ManageRewardsPage implements OnInit {
  items: ManageReward[];
  success: boolean = false;
  pointsMapping: { [k: string]: string } = { '=1': '# pt', 'other': '# pts' };

  constructor(private service: ManageRewardService,
    private loadingService: LoadingService,
    private nav: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
  }

  ionViewDidEnter(): void {
    this.getRewards();
  }

  create(): void {
    this.nav.push('ManageRewardDetailPage');
  }

  update(item: ManageReward): void {
    this.nav.push('ManageRewardDetailPage', {
      item: item
    });    
  }

  delete(idx, item: ManageReward): void {
    let prompt = this.alertCtrl.create({
      title: 'Delete Reward',
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
            this.service.deleteReward(item.id).subscribe(success => {
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
    });
    prompt.present();
  }

  private getRewards(): void {
    this.service.getRewards().subscribe(profiles => {
      this.items = profiles
    },
      err => {
        console.log(err);
      });
  }
}