import { Component, OnInit } from "@angular/core";
import { Service } from "../_models/service";
import { ServicesService } from "../_services/services.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html"
})
export class ServicesComponent implements OnInit {
  services_sk: Service[];
  services_cz: Service[];

  constructor(
    private servicesService: ServicesService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.servicesService.readServicesSK().subscribe((services: Service[]) => {
      this.services_sk = services;
    });

    this.servicesService.readServicesCZ().subscribe((services: Service[]) => {
      this.services_cz = services;
    });
  }

  updateServicesSK(){

  }

  updateServicesCZ(){

  }

  updateService(service: Service) {
    return this.httpClient.put<Service>(
      "https://admin.unitext.sk/backend/update_service.php",
      service
    );
  }
}
