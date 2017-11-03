import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { WorkoutFinished } from './workoutFinished';

@Injectable()
export class WorkoutFinishedService {
  private workoutHistoryUri = `${AppSettings.API_ENDPOINT}/api/v1/workoutHistory/`;

  constructor(private authHttpService: AuthHttpService) { }

  getFinishedWorkout(profileId: number): Observable<WorkoutFinished> {
    return this.authHttpService.get(`${this.workoutHistoryUri}/profile/${profileId}/latest`)
      .map((response: Response) =>  response.json());
  }
}