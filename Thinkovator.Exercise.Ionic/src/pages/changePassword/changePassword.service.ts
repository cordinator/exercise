import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { ChangePassword } from './changePassword';
import { AuthHttpService } from '../../app/auth/auth-http.service';

@Injectable()
export class ChangePasswordService {
  private profilesUri = `${AppSettings.API_ENDPOINT}/api/v1/account`;

  constructor(private authHttpService: AuthHttpService) { }

  changePassword(changePassword: ChangePassword): Observable<boolean> {
    return this.authHttpService.put(`${this.profilesUri}/changePassword`, {
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        confirmNewPassword: changePassword.confirmNewPassword
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