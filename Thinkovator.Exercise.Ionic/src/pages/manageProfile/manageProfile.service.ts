import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { ManageProfile } from './manageProfile';

@Injectable()
export class ManageProfileService {
  private profilesUri = `${AppSettings.API_ENDPOINT}/api/v1/profile`;

  constructor(private authHttpService: AuthHttpService) { }

  getProfiles(): Observable<ManageProfile[]> {
    return this.authHttpService.get(this.profilesUri)
      .map((response: Response) => response.json());
  }

  createProfile(name: string): Observable<boolean> {
    return this.authHttpService.post(`${this.profilesUri}`, {
        name: name
      })
      .map((response: Response) => response.json());
  }

  updateProfile(id: number, name: string): Observable<boolean> {
    return this.authHttpService.put(`${this.profilesUri}/${id}`, {
        name: name
      })
      .map((response: Response) => response.json());
  }

  deleteProfile(id: number): Observable<boolean> {
    return this.authHttpService.delete(`${this.profilesUri}/${id}`)
      .map((response: Response) => response.json());
  }
}