import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { PartnerModel } from '../_models/partner';
import { PartnersService } from '../_services/partners.service';
import {NotificationService} from '../_services/notification.service';
import {environment} from '../../environments/environment';
import {FileItem, FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[];
  errors: Array<Error> = [];
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl + '/upload/', itemAlias: 'logo'});

  constructor(private partnersService: PartnersService,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.loadPartners();

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:FileItem, response:any, status:any, headers:any) => {
      if(status === 200){
        let uploadPath = JSON.parse(response).data.name.split('/');
        this.createPartner(uploadPath[uploadPath.length - 1]);
      }
    };
  }

  loadPartners(){
    this.partnersService.readPartners().subscribe((partners: PartnerModel[]) => {
      this.partners = partners;
    });
  }

  createPartner(image: string) {
    let partner = new PartnerModel();
    partner.image = environment.apiUrl + '/' + image;
    this.partnersService.createPartner(partner).subscribe(resp => {
      if(resp){
        this.loadPartners();
      }
      this.changeDetectorRef.detectChanges();
    })
  }

  updatePartners() {
    var response = true;
    this.partners.forEach(partner => {
      this.partnersService.updatePartner(partner).subscribe((resp) => {
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Partneri boli aktualizovaní');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }

  removePartner(partner: PartnerModel){
      this.partnersService.removePartner(partner).subscribe((resp) => {
        if (resp) {
          this.notificationService.success('Partner bol odstránený');
          this.loadPartners();
        }else{
          this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
        }
      });
  }
}
