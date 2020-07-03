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
  filterargs = 'sk';

  constructor(private menuService: MenuService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.menuService.readMenu().subscribe((links: LinkModel[]) => {
      this.links = links;
    });
  }

  updateMenu() {
    var response = true;
    this.links.forEach(link => {
      this.menuService.updateMenu(link).subscribe((resp) => {
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
