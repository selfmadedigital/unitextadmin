import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Service } from "../_models/service";

@Injectable({
  providedIn: "root"
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  readServicesSK(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(
      `https://admin.unitext.sk/backend/read_services_sk.php`
    );
  }

  readServicesCZ(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(
      `https://admin.unitext.sk/backend/read_services_cz.php`
    );
  }

  updateService(service: Service) {
    return this.httpClient.put<Service>(
      `https://admin.unitext.sk/backend/update_service.php`,
      service
    );
  }
}
