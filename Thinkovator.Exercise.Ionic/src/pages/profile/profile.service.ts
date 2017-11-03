import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { Profile } from './profile';
import { History } from '../history/history';

@Injectable()
export class ProfileService {
  private profilesUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;
  private workoutHistoryUri = `${AppSettings.API_ENDPOINT}/api/v1/workoutHistory`;

  constructor(private authHttpService: AuthHttpService) { }

  getProfiles(): Observable<Profile[]> {
    return this.authHttpService.get(this.profilesUri)
      .map((response: Response) => response.json());
  }

  getProfile(id: number): Observable<Profile> {
    return this.authHttpService.get(`${this.profilesUri}/${id}`)
      .map((response: Response) => response.json());
  }

  setProfile(profile: Profile): void {

  }

  validatePin(id: number, pin: number): Observable<boolean> {
    return this.authHttpService.get(`${this.profilesUri}/${id}/validate/${pin}`)
      .map((response: Response) => response.json());
  }

  getWorkoutHistory(profileId: number, top: number): Observable<Array<History>> {
    return this.authHttpService.get(`${this.workoutHistoryUri}/profile/${profileId}/top/${top}`)
      .map((response: Response) => response.json());
  }
}