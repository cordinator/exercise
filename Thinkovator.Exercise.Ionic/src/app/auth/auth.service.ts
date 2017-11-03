import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AppSettings } from '../app.settings';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../pages/forgotPassword/forgotPassword';
import { AuthHttpService } from './auth-http.service';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http, private authHttpService: AuthHttpService) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  public login(loginCredentials: Login): Observable<boolean> {
    if (loginCredentials.email === null || loginCredentials.password === null) {
      return Observable.throw("Please insert credentials");
    }

    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({ headers: headers });

    let usernameRequest = '&username=' + encodeURIComponent(loginCredentials.email);
    let passwordRequest = '&password=' + encodeURIComponent(loginCredentials.password);
    let data = 'grant_type=password' + usernameRequest + passwordRequest;

    return this.http.post(`${AppSettings.API_ENDPOINT}/api/oauth/token`, data, options)
      .map((response: Response) => {
        let token = response.json() && response.json().access_token;
        if (token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({ username: loginCredentials.email, token: token }));

          return true;
        } else {
          return false;
        }
      });
  }

  public logout(): Observable<boolean> {
    return this.authHttpService.post(`${AppSettings.API_ENDPOINT}/api/v1/account/logout`, null)
      .map((res: Response) => {
        if (res.status === 200) {
          this.token = null;
          localStorage.removeItem('currentUser');
          return true;
        } else {
          return false;
        }
      });
  }
}