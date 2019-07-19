import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PriceModel } from '../_models/price';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class PricesService {
  constructor(private httpClient: HttpClient) {}

  readPrices(): Observable<PriceModel[]> {
    return this.httpClient.get<PriceModel[]>(environment.apiUrl + '/prices/')
  }

  updatePrice(price: PriceModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + '/prices/', price
    )
  }
}
