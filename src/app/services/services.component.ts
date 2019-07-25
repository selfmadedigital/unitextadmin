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
  services: ServiceModel[];

  constructor(
    private servicesService: ServicesService,
    private notificationService: NotificationService
  ) {}

  filterSK(service: ServiceModel) {
    return service.lang === 'sk';
  }

  filterCZ(service: ServiceModel) {
    return service.lang === 'cz';
  }

  ngOnInit() {
    this.servicesService.readServices().subscribe((services: ServiceModel[]) => {
      this.services = services;
    });
  }

  updateServices() {
    var response = true;
    this.services.forEach(service => {
      this.servicesService.updateService(service).subscribe((resp) => {
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Menu bolo aktualizované');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }
}

