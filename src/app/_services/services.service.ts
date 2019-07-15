import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel } from '../_models/service';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  readServices(): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(
      `https://admin.unitext.sk/backend/read_services.php`
    );
  }

  updateServices(services: ServiceModel[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      'https://admin.unitext.sk/backend/update_services.php', services
    );
  }
}
