import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../_models/service';
import { ServicesService } from '../_services/services.service';
import { ResponseModel } from '../_models/response';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  services: ServiceModel[];

  constructor(
    private servicesService: ServicesService
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
      console.log(this.services);
    });
  }

  updateServices() {
    this.servicesService.updateServices(this.services).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
