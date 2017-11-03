import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthHttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser && currentUser.token;
    
    options.headers.set('Accept', 'application/json');
    options.headers.set('Content-Type', 'application/json');
    options.headers.set('Authorization', `Bearer ${token}`);
    options.headers.set('profileId', localStorage.getItem('profileId'));

    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser && currentUser.token;

    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        options = { headers: new Headers() };
      }

      options.headers.set('Accept', 'application/json');
      options.headers.set('Content-Type', 'application/json');
      options.headers.set('Authorization', `Bearer ${token}`);
      options.headers.set('profileId', localStorage.getItem('profileId'));
    } else {
      url.headers.set('Authorization', `Bearer ${token}`);
      url.headers.set('profileId', localStorage.getItem('profileId'));
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: AuthHttpService) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}