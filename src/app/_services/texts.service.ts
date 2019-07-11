import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TextsService {
  constructor(private httpClient: HttpClient) {}

  getTexts(): Observable<Text[]> {
    return this.httpClient.get<Text[]>(
      "https://admin.unitext.sk/backend/get_texts.php"
    );
  }
}
