import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TextModel } from '../_models/text';

@Injectable({
  providedIn: 'root'
})
export class TextsService {
  constructor(private httpClient: HttpClient) {}

  readTexts(): Observable<TextModel[]> {
    return this.httpClient.get<TextModel[]>(
      'https://admin.unitext.sk/backend/read_texts.php'
    );
  }

  updateTexts(texts: TextModel[]) {
    return this.httpClient.post('https://admin.unitext.sk/backend/update_texts.php', texts);
  }
}
