import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { Settings } from './settings';

@Injectable()
export class SettingsService {
  private settingsUri = `${AppSettings.API_ENDPOINT}/api/v1/settings`;

  constructor(private authHttpService: AuthHttpService) { }
  
  getSettings(id: number): Observable<Settings> {
    return this.authHttpService.get(`${this.settingsUri}/${id}`)
      .map((response: Response) => response.json());
  }

  updateSettings(settings: Settings): Observable<boolean> {
    return this.authHttpService.put(`${this.settingsUri}/${settings.id}`, {
        name: settings.name,
        age: settings.weight,
        weight: settings.age,
        units: settings.units
      })
      .map((res: Response) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
  }
}