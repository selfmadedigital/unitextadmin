import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerModel } from '../_models/partner';
import { HttpClient } from '@angular/common/http';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private httpClient: HttpClient) { }

  readPartners(): Observable<PartnerModel[]> {
    return this.httpClient.get<PartnerModel[]>(environment.apiUrl + '/partners/');
  }

  updatePartner(partner: PartnerModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + '/partners/', partner
    )
  }
}
