import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { History, HistoryRequest } from './history';

@Injectable()
export class HistoryService {
  private historyUri = `${AppSettings.API_ENDPOINT}/api/v1/workouthistory`;

  constructor(private authHttpService: AuthHttpService) { }

  getWorkoutHistory(profileId: number): Observable<History[]> {
    return this.authHttpService.get(`${this.historyUri}/profile/${profileId}`)
      .map((response: Response) => response.json());
  }

  createWorkoutHistory(request: HistoryRequest): Observable<boolean> {
    return this.authHttpService.post(`${this.historyUri}`, {
      profileId: request.profileId,
      workoutId: request.workoutId,
      lengthInSeconds: request.lengthInSeconds,
      workoutDate: request.workoutDate
    })
      .map((response: Response) => response.json());
  }

  updateWorkoutHistory(request: HistoryRequest): Observable<boolean> {
    return this.authHttpService.put(`${this.historyUri}/${request.id}`, {
      profileId: request.profileId,
      workoutId: request.workoutId,
      lengthInSeconds: request.lengthInSeconds,
      workoutDate: request.workoutDate
    })
      .map((response: Response) => response.json());
  }

  deleteWorkoutHistory(profileId: number, id: number): Observable<boolean> {
    return this.authHttpService.delete(`${this.historyUri}/profile/${profileId}/history/${id}`)
      .map((response: Response) => response.json());
  }
}