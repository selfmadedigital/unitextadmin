import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpRequest} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {StorageService} from '../_services/storage.service';
import {Router} from '@angular/router';
import {User} from '../_models/user';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient, private storage: StorageService, private router: Router){
  }

  public getToken(): string {
    return this.storage.getValue('token' );
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if(token == null){
      return false;
    }else {
      return !this.isTokenExpired(token);
    }
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    if(!token || token === undefined){
      return true;
    }else{
      const date = this.getTokenExpirationDate(token);
      if(date === undefined) return false;
      return !(date.valueOf() > new Date().valueOf());
    }
  }

  public login(username: string, password: string){
    return this.httpClient.post(
      environment.authUrl + '/login/', {"username":username, "password": password}
    ).subscribe(response => {
      this.storage.storeValue('token', response['token']);
      this.storage.storeValue('username', response['username']);
      this.storage.setRealUsername(response['realname'])
      this.router.navigate(['/dashboard']);
    });
  }

  public changePassword(password: string){
    return this.httpClient.put(
      environment.authUrl + '/password/', {"username":this.storage.getValue('username'), "password": password}
    ).toPromise().then(response => {
      return response;
    })
  }

  public logout(){
    this.storage.removeValue('token');
    this.storage.removeValue('username');
    this.storage.setRealUsername('');
    this.router.navigate(['/login']);
  }
}
