import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { CustomWorkout } from './customWorkout';
import { AuthHttpService } from '../../app/auth/auth-http.service';

@Injectable()
export class CustomWorkoutService {
  private customWorkoutUri = `${AppSettings.API_ENDPOINT}/api/v1/customWorkout`;

  constructor(private authHttpService: AuthHttpService) { }

  getWorkouts(): Observable<CustomWorkout[]> {
    return this.authHttpService.get(this.customWorkoutUri)
      .map((response: Response) => response.json());
  }
}