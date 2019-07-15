import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { TextsService } from '../_services/texts.service';
import { TextModel } from '../_models/text';
import { ResponseModel } from '../_models/response';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html'
})
export class TextsComponent implements OnInit {
  texts: TextModel[];

  constructor(private textsService: TextsService) {}

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
    this.textsService.updateTexts(this.texts).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
