import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkModel } from '../_models/link';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../_models/response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  readMenu(): Observable<LinkModel[]> {
    return this.httpClient.get<LinkModel[]>(
      'https://admin.unitext.sk/backend/read_menu.php'
    );
  }

  updateMenu(menu: LinkModel[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      'https://admin.unitext.sk/backend/update_menu.php', menu
    );
  }
}
