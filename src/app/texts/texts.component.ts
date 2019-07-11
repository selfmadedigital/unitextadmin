import { Component, OnInit, ViewChild } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/filter";
import { TextsService } from "../_services/texts.service";

@Component({
  selector: "app-texts",
  templateUrl: "./texts.component.html"
})
export class TextsComponent implements OnInit {
  texts_sk: Text[];
  texts_cz: Text[];

  constructor(private textsService: TextsService) {}

  ngOnInit() {
    this.textsService.getTexts().subscribe((texts: Text[]) => {
      this.texts_sk = texts["sk"];
      this.texts_cz = texts["cz"];

      console.log(this.texts_cz);
    });
  }
}
