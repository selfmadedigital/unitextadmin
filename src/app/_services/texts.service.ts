import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TextModel } from '../_models/text';
import {ResponseModel} from '../_models/response';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextsService {
  constructor(private httpClient: HttpClient) {}

  readTexts(): Observable<TextModel[]> {
    return this.httpClient.get<TextModel[]>(environment.apiUrl + '/content/')
  }

  updateText(text: TextModel): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/content/', text
    )
  }

}
