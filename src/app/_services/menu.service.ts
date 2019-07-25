import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkModel } from '../_models/link';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../_models/response';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  readMenu(): Observable<LinkModel[]> {
    return this.httpClient.get<LinkModel[]>(environment.apiUrl + '/menu/');
  }

  updateMenu(menu: LinkModel): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/menu', menu
    )
  }
}
