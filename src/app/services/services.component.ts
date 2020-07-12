import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../_models/service';
import { ServicesService } from '../_services/services.service';
import { ResponseModel } from '../_models/response';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit {
  list: ServiceModel[];

  constructor(
    private servicesService: ServicesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.servicesService.readServices().subscribe((services: ServiceModel[]) => {
      this.list = services;
    });
  }

  updateServices() {
    var response = true;
    this.list.forEach(service => {
      this.servicesService.updateService(service).subscribe((resp) => {
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Služby boli aktualizované');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }
}

