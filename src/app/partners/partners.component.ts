import { Component, OnInit } from '@angular/core';
import { PartnerModel } from '../_models/partner';
import { PartnersService } from '../_services/partners.service';
import { ResponseModel } from '../_models/response';
import {FileHolder} from 'angular2-image-upload';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[];
  partner: PartnerModel;
  images = new Array();

  constructor(private partnersService: PartnersService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.partnersService.readPartners().subscribe((partners: PartnerModel[]) => {
      this.partners = partners;
    });
  }

  updatePartners() {
    this.partnersService.updatePartners(this.partners).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        this.notificationService.success('Partneri boli aktualizovaní');
      }else{
        this.notificationService.error('Niečo sa pokazilo! Výpis chýb:');
        resp.errors.forEach(value => {
          this.notificationService.error(value);
        })
      }
    });
  }

  onUploadFinished(file: FileHolder) {
    this.partner = new PartnerModel();
    this.partner.image = 'https://www.solodev.com/assets/carousel/image8.png';
    this.partner.href = '';
    this.partner.name = '';
    this.partners.push(this.partner);
    console.log(this.partners);
  }
}
