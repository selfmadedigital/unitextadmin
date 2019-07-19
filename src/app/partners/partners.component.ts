import { Component, OnInit } from '@angular/core';
import { PartnerModel } from '../_models/partner';
import { PartnersService } from '../_services/partners.service';
import {NotificationService} from '../_services/notification.service';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[];
  errors: Array<Error> = [];
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl + '/upload/', itemAlias: 'photo'});

  constructor(private partnersService: PartnersService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.partnersService.readPartners().subscribe((partners: PartnerModel[]) => {
      this.partners = partners;
    });

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  updatePartners() {
    this.partners.forEach(partner => {
      this.partnersService.updatePartner(partner).subscribe((resp) => {
        if (!resp.success) {
          this.errors.push(resp.error);
        }
      });
    });
    if (this.errors.length === 0){
      this.notificationService.success('Partneri boli aktualizovaní');
    } else{
      this.errors.forEach(value => {
        this.notificationService.error(value.message);
      })
    }
  }
}
