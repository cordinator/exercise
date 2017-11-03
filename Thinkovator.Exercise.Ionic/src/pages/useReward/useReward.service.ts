import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { UseReward } from './useReward';

@Injectable()
export class UseRewardService {
  private profileUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;

  constructor(private authHttpService: AuthHttpService) {
  }

  getRewards(profileId: number): Observable<UseReward[]> {
    return this.authHttpService.get(`${this.profileUri}/${profileId}/rewards`)
      .map((response: Response) => response.json());
  }

  useReward(profileId: number, id: number): Observable<boolean> {
    return this.authHttpService.delete(`${this.profileUri}/${profileId}/rewards/${id}`)
      .map((response: Response) => response.json());
  }
}