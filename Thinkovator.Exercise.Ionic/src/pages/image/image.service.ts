import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { AuthHttpService } from '../../app/auth/auth-http.service';
import { Image } from './image';

@Injectable()
export class ImageService {
  private settingsUri = `${AppSettings.API_ENDPOINT}/api/v1/settings`;

  constructor(private authHttpService: AuthHttpService) { }
  
  getImage(id: number): Observable<Image> {
    return this.authHttpService.get(`${this.settingsUri}/${id}`)
      .map((response: Response) => response.json());
  }
}