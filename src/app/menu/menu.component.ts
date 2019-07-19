import { Component, OnInit } from '@angular/core';
import { TextModel } from '../_models/text';
import { LinkModel } from '../_models/link';
import { MenuService } from '../_services/menu.service';
import { ResponseModel } from '../_models/response';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  links: LinkModel[];
  errors: Array<Error> = [];

  constructor(private menuService: MenuService,
              private notificationService: NotificationService) {
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
    this.links.forEach(link => {
      this.menuService.updateMenu(link).subscribe((resp) => {
        if (!resp.success) {
          this.errors.push(resp.error);
        }
      });
    });
    if (this.errors.length === 0){
      this.notificationService.success('Menu bolo aktualizované');
    } else{
      this.errors.forEach(value => {
        this.notificationService.error(value.message);
      })
    }
  }
}
