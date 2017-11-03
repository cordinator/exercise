import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { Workout } from './workout';

@Injectable()
export class WorkoutService {
  private profileUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;

  constructor(private authHttpService: AuthHttpService) { }

  getWorkouts(profileId: number): Observable<Workout[]> {
    return this.authHttpService.get(`${this.profileUri}/${profileId}/workouts`)
      .map((response: Response) => response.json());
  }
}