import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TostService } from './tost.service';
// import { BASEURL } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomHTTPService {

  // url: string = BASEURL;
  url = 'http://139.59.18.149:8282/crab';
  constructor(public http: HttpClient, public router: Router, public tostService: TostService) { }

  getHeaders(optHeaders?: HttpHeaders) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('accessToken')) {
      headers = headers.set('crab_at', localStorage.getItem('accessToken')
      );
    }
    if (optHeaders) {
      for (const optHeader of optHeaders.keys()) {
        headers = headers.append(optHeader, optHeaders.get(optHeader));
      }
    }
    return headers;
  }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .get(this.url + '/' + endpoint, { headers: header, observe: 'response' })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {

    const header = this.getHeaders(optHeaders);
    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response',
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }



  postLogin(endpoint: string, body: any) {
    // const header = this.getHeaders(optHeaders);
    let Headers = new HttpHeaders();
    Headers = Headers.set(
      'fb_at',
      '6abbe313-8f13-42b2-993f-8f50b210b8fc-y7oPDwXZOewcdzG2IJ+35u1wy6OZxQp9AguwKJhnU38='
    );
    Headers = Headers.set(
      'Content-Type', 'application/json');

    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: Headers,
        observe: 'response',
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      }).pipe(map(this.extractData), catchError(this.handleError));

  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .delete(this.url + '/' + endpoint, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  patch(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  extractData = (response: HttpResponse<any>) => {
    if (response.body.status === 200 || response.body.status === 204) {
      return response.body || response.status;
    } else {
      this.tostService.showNotificationFailure(response.body.message);
      return response.body;
    }

  }

  handleError = (errorResponse: HttpErrorResponse) => {
    console.log(errorResponse);

    switch (errorResponse.status) {
      case 401:
        this.router.navigate(['/login']).then(() => {
          this.tostService.showNotificationFailure(errorResponse.error.message);
        });
        localStorage.clear();
        break;
      case 0:
        this.tostService.showNotificationFailure('You don\'t seem to have an active internet connection. Please connect and try again.');
        break;
      default:
        this.tostService.showNotificationFailure(errorResponse.error.message);
        break;
    }
    return throwError(errorResponse);
  }
}
