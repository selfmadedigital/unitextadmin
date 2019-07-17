import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { User } from "../_models/user";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ResponseModel} from '../_models/response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  errorData: {};

  constructor(private http: HttpClient, private router: Router) { }

  redirectUrl: string;

  login(username: string, password: string) {
    return this.http.post<any>('https://admin.unitext.sk/backend/authenticate_user.php', {username: username, password: password})
      .pipe(map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        }),
        catchError(this.handleError)
      );
  }


  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getLoggedName(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.first_name + ' ' + currentUser.last_name;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
