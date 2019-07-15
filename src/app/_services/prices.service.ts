import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PriceModel } from '../_models/price';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';

@Injectable({
  providedIn: "root"
})
export class PricesService {
  constructor(private httpClient: HttpClient) {}

  readPrices(): Observable<PriceModel[]> {
    return this.httpClient.get<PriceModel[]>(
      `https://admin.unitext.sk/backend/read_prices.php`
    );
  }

  updatePrices(prices: PriceModel[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      'https://admin.unitext.sk/backend/update_prices.php', prices
    );
  }
}
