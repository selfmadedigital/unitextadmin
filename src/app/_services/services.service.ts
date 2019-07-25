import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel } from '../_models/service';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  readServices(): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(environment.apiUrl + '/service/')
  }

  updateService(service: ServiceModel): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/service/', service
    )
  }
}
