import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { TextsService } from '../_services/texts.service';
import { TextModel } from '../_models/text';
import { ResponseModel } from '../_models/response';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html'
})
export class TextsComponent implements OnInit {
  texts: TextModel[];
  errors: Array<Error> = [];


  constructor(private textsService: TextsService,
              private notificationService: NotificationService) {}


  filterSK(text: TextModel) {
    return text.lang === 'sk';
  }

  filterCZ(text: TextModel) {
    return text.lang === 'cz';
  }

  ngOnInit() {
    this.textsService.readTexts().subscribe((texts: TextModel[]) => {
      this.texts = texts;
    });
  }

  updateTexts() {
    this.texts.forEach(text => {
      this.textsService.updateText(text).subscribe((resp) => {
        if (!resp.success) {
          this.errors.push(resp.error);
        }
      });
    });
    if (this.errors.length === 0){
      this.notificationService.success('Texty boli aktualizované');
    } else{
      this.errors.forEach(value => {
        this.notificationService.error(value.message);
      })
    }
  }
}
