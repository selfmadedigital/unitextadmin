import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { PartnerModel } from '../_models/partner';
import { PartnersService } from '../_services/partners.service';
import { NotificationService } from '../_services/notification.service';
import { environment } from '../../environments/environment';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners: PartnerModel[];
  imagePath: string;
  errors: Array<Error> = [];
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl + '/upload/',
    itemAlias: 'image',
    authTokenHeader: "Authorization",
    authToken: 'Bearer ' + this.authService.getToken() });

  constructor(private partnersService: PartnersService,
              private notificationService: NotificationService,
              private changeDetectorRef: ChangeDetectorRef,
              private authService: AuthService) {
    this.imagePath = environment.baseUrl;
  }

  ngOnInit() {
    this.loadPartners();

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:FileItem, response:any, status:any, headers:any) => {
      if(status === 200){
        this.createPartner(JSON.parse(response)['file']);
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
    partner.image = image;
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
        if (resp['status'] == 'ok') {
          this.notificationService.success('Partner bol odstránený');
          this.loadPartners();
        }else{
          this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
        }
      });
  }
}
