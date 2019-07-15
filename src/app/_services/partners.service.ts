import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerModel } from '../_models/partner';
import { HttpClient } from '@angular/common/http';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private httpClient: HttpClient) { }

  readPartners(): Observable<PartnerModel[]> {
    return this.httpClient.get<PartnerModel[]>(
      'https://admin.unitext.sk/backend/read_partners.php'
    );
  }

  updatePartners(partners: PartnerModel[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      'https://admin.unitext.sk/backend/update_partners.php', partners
    );
  }
}
