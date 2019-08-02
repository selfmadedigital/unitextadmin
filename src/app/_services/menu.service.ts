import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkModel } from '../_models/link';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  readMenu(): Observable<Object[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getAuthorizationToken()
    });

    return this.httpClient.get<Object[]>(environment.apiUrl + '/menu/', {headers: reqHeader});
  }

  updateMenu(menu: Object): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/menu', menu
    )
  }
}
