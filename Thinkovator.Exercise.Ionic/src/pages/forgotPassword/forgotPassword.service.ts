import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { ForgotPassword } from './forgotPassword';

@Injectable()
export class ForgotPasswordService {
  private forgotPasswordUri = `${AppSettings.API_ENDPOINT}/api/v1/account/forgotPassword`;

  constructor(private http: Http) { }

  public forgotPassword(forgotPassword: ForgotPassword): Observable<boolean> {
    if (forgotPassword.email === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(`${this.forgotPasswordUri}`, forgotPassword)
        .map((res: Response) => {
          if (res.status === 200) {
            return true;
          } else {
            return false;
          }
        });
    }
  }
}



