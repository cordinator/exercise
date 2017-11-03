import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings'
import { BuyReward } from './buyReward';
import { AuthHttpService } from '../../app/auth/auth-http.service';

@Injectable()
export class BuyRewardsService {
  private rewardsUri = `${AppSettings.API_ENDPOINT}/api/v1/reward`;
  private profileUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;

  constructor(private authHttpService: AuthHttpService) {
  }

  getRewards(): Observable<BuyReward[]> {
    return this.authHttpService.get(this.rewardsUri)
      .map((response: Response) => response.json());
  }

  buyReward(profileId: number, id: number): Observable<boolean> {
    return this.authHttpService.post(`${this.profileUri}/${profileId}/rewards`, {
      rewardId: id
    })
      .map((response: Response) => response.json());
  }
}