import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { ManageReward } from './manageReward';

@Injectable()
export class ManageRewardService {
  private profilesUri = `${AppSettings.API_ENDPOINT}/api/v1/reward`;

  constructor(private authHttpService: AuthHttpService) { }

  getRewards(): Observable<ManageReward[]> {
    return this.authHttpService.get(this.profilesUri)
      .map((response: Response) => response.json());
  }

  createReward(manageReward: ManageReward): Observable<boolean> {
    return this.authHttpService.post(`${this.profilesUri}`, {
        name: manageReward.name,
        description: manageReward.description,
        points: manageReward.points
      })
      .map((response: Response) => response.json());
  }

  updateReward(manageReward: ManageReward): Observable<boolean> {
    return this.authHttpService.put(`${this.profilesUri}/${manageReward.id}`, {
      name: manageReward.name,
      description: manageReward.description,
      points: manageReward.points
    })
      .map((response: Response) => response.json());
  }

  deleteReward(id: number): Observable<boolean> {
    return this.authHttpService.delete(`${this.profilesUri}/${id}`)
      .map((response: Response) => response.json());
  }
}