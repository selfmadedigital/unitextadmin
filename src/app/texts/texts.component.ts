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
    var response = true;
    this.texts.forEach(text => {
      this.textsService.updateText(text).subscribe((resp) => {
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
