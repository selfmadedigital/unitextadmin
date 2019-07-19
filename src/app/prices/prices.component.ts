import { Component, OnInit } from '@angular/core';
import { PriceModel } from '../_models/price';
import { PricesService } from '../_services/prices.service';
import { ResponseModel } from '../_models/response';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  prices: PriceModel[];
  errors: Array<Error> = [];

  constructor(
    private pricesService: PricesService,
    private notificationService: NotificationService
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
    });
  }

  updatePrices() {
    this.prices.forEach(price => {
      this.pricesService.updatePrice(price).subscribe((resp) => {
        if (!resp.success) {
          this.errors.push(resp.error);
        }
      });
    });
    if (this.errors.length === 0){
      this.notificationService.success('Ceny boli aktualizované');
    } else{
      this.errors.forEach(value => {
        this.notificationService.error(value.message);
      })
    }
  }
}
