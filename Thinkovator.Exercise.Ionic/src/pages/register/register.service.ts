import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app/app.settings';
import { Register } from './register';

@Injectable()
export class RegisterService {
  private registerUri = `${AppSettings.API_ENDPOINT}/api/v1/account/register`;

  constructor(private http: Http) { }

  public register(registerCredentials: Register): Observable<boolean> {
    if (registerCredentials.email === null || registerCredentials.password === null ||
        registerCredentials.confirmPassword === null || registerCredentials.name === null ||
        registerCredentials.pin === null) {
          return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(`${this.registerUri}`, registerCredentials)
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



