import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { ResponseModel } from '../_models/response';
import { ContactModel } from '../_models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts: ContactModel[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.readContacts().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts;
    });
  }

  updateContacts() {
    this.contactsService.updateContacts(this.contacts).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
