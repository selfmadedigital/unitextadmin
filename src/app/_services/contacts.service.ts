import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../_models/response';
import { ContactModel } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  readContacts(): Observable<ContactModel[]> {
    return this.httpClient.get<ContactModel[]>(
      `https://admin.unitext.sk/backend/read_contacts.php`
    );
  }

  updateContacts(socials: ContactModel[]): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      'https://admin.unitext.sk/backend/update_contacts.php', socials
    );
  }
}
