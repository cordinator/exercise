import { IonicPage, NavController } from 'ionic-angular';
import { I18nPluralPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../app/loading/loading.service';
import { History } from '../history/history';

import { ProfileService } from './profile.service';
import { Profile } from './profile';

@IonicPage()
@Component({
  selector: 'page-profile-detail',
  templateUrl: 'profile-detail.component.html',
  providers: [ProfileService]
})
export class ProfileDetailPage implements OnInit {
  selectedItem: Profile;
  workoutHistory: Array<History>
  historyExists: boolean = false;
  ptsMapping: { [k: string]: string } = { '=1': '# pt', 'other': '# pts' };
  caloriesMapping: { [k: string]: string } = { '=1': 'calorie', 'other': 'calories' };
  pointsMapping: { [k: string]: string } = { '=1': 'point', 'other': 'points' };
  minutesMapping: { [k: string]: string } = { '=1': 'min', 'other': 'mins' };

  constructor(private service: ProfileService,
    private loadingService: LoadingService,
    private navCtrl: NavController) { }

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.getSelectedItem();
    this.getWorkoutHistory();
  }

  workout(): void {
    this.navCtrl.push('WorkoutsPage');
  }

  buyRewards(): void {
    this.navCtrl.push('BuyRewardsPage');
  }

  useRewards(): void {
    this.navCtrl.push('UseRewardPage');
  }

  history(): void {
    this.navCtrl.push('HistoryPage');
  }

  private getSelectedItem(): void {
    let profileId = +localStorage.getItem('profileId');

    this.loadingService.showLoading();
    this.service.getProfile(profileId).subscribe(res => {
      this.selectedItem = res;
      
      localStorage.setItem('points', this.selectedItem.points.toString());

      this.loadingService.dismiss();
    },
      error => {
        this.loadingService.dismiss();
      });
  }

  private getWorkoutHistory(): void {
    let profileId = +localStorage.getItem('profileId');
    
    this.service.getWorkoutHistory(profileId, 3).subscribe((workouts: Array<History>) => {
      this.workoutHistory = workouts;
      this.historyExists = this.workoutHistory && this.workoutHistory.length > 0 ? true : false;
    });
  }
}
