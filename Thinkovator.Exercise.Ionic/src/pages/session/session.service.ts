import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { Session } from './session';

@Injectable()
export class SessionService {
  private workoutUri = `${AppSettings.API_ENDPOINT}/api/v1/workouts`;
  private profileUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;

  constructor(private authHttpService: AuthHttpService) {
  }

  getVideos(workoutId: number): Observable<Array<string>> {
    return this.authHttpService.get(`${this.workoutUri}/${workoutId}/videos`)
      .map((response: Response) => response.json());
  }

  createSession(session: Session): Observable<boolean> {
    return this.authHttpService.post(`${this.profileUri}/${session.profileId}/sessions`,
      {
        workoutId: session.workoutId,
        lengthInSeconds: session.length
      })
      .map((response: Response) => response.json());
  }
}