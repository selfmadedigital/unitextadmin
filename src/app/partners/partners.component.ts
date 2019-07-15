import { Component, OnInit } from '@angular/core';
import { PartnerModel } from '../_models/partner';
import { PartnersService } from '../_services/partners.service';
import { ResponseModel } from '../_models/response';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[];

  constructor(private partnersService: PartnersService) {}

  ngOnInit() {
    this.partnersService.readPartners().subscribe((partners: PartnerModel[]) => {
      this.partners = partners;
    });
  }

  updatePartners() {
    this.partnersService.updatePartners(this.partners).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
