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

  list: PriceModel[];
  errors: Array<Error> = [];

  constructor(
    private pricesService: PricesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.pricesService.readPrices().subscribe((prices: PriceModel[]) => {
      this.list = prices;
    });
  }

  updatePrices() {
    var response = true;
    this.list.forEach(price => {
      this.pricesService.updatePrice(price).subscribe((resp) => {
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Cenník bol aktualizovaný');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }
}
