import { Component, OnInit } from "@angular/core";
import { Service } from "../_models/service";
import { ServicesService } from "../_services/services.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html"
})
export class ServicesComponent implements OnInit {
  services: [Service[]];

  constructor(
    private servicesService: ServicesService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.servicesService.readServices().subscribe((services: [Service[]]) => {
      this.services = services;
      console.log(this.services);
    });
  }
}
