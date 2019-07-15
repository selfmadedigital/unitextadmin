import { Component, OnInit } from '@angular/core';
import { PriceModel } from '../_models/price';
import { PricesService } from '../_services/prices.service';
import { ResponseModel } from '../_models/response';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  prices: PriceModel[];

  constructor(
    private pricesService: PricesService
  ) {}

  filterSK(price: PriceModel) {
    return price.lang === 'sk';
  }

  filterCZ(price: PriceModel) {
    return price.lang === 'cz';
  }

  ngOnInit() {
    this.pricesService.readPrices().subscribe((prices: PriceModel[]) => {
      this.prices = prices;
      console.log(this.prices);
    });
  }

  updatePrices() {
    this.pricesService.updatePrices(this.prices).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
