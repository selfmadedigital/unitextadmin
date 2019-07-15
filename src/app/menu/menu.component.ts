import { Component, OnInit } from '@angular/core';
import { TextModel } from '../_models/text';
import { LinkModel } from '../_models/link';
import { MenuService } from '../_services/menu.service';
import { ResponseModel } from '../_models/response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  links: LinkModel[];

  constructor(private menuService: MenuService) {
  }

  filterSK(text: TextModel) {
    return text.lang === 'sk';
  }

  filterCZ(text: TextModel) {
    return text.lang === 'cz';
  }

  ngOnInit() {
    this.menuService.readMenu().subscribe((links: LinkModel[]) => {
      this.links = links;
    });
  }

  updateMenu() {
    this.menuService.updateMenu(this.links).subscribe((resp: ResponseModel) => {
      if (resp.status === 'ok') {
        console.log(resp);
      }
    });
  }
}
