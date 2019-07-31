import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../_services/contacts.service';
import { ResponseModel } from '../_models/response';
import { ContactModel } from '../_models/contact';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts: ContactModel[];
  errors: Array<Error> = [];

  constructor(private contactsService: ContactsService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.contactsService.readContacts().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts;
    });
  }

  updateContacts() {
    var response = true;
    this.contacts.forEach(contact => {
      this.contactsService.updateContacts(contact).subscribe((resp) => {
        console.log(resp);
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Menu bolo aktualizované');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }
}
