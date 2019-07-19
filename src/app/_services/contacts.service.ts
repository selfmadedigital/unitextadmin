import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../_models/response';
import { ContactModel } from '../_models/contact';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  readContacts(): Observable<ContactModel[]> {
    return this.httpClient.get<ContactModel[]>(environment.apiUrl + '/contacts/')
  }

  updateContacts(contact: ContactModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + '/contacts/', contact
    )
  }
}
