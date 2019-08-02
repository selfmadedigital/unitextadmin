import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkModel } from '../_models/link';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  readMenu(): Observable<Object[]> {
    return this.httpClient.get<Object[]>(environment.apiUrl + '/menu/');
  }

  updateMenu(menu: Object): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/menu', menu
    )
  }
}
