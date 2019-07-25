import { Component, OnInit } from '@angular/core';
import {Notification, NotificationType} from '../../_models/Notification';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];
  timer;

  constructor(private alertService: NotificationService) { }

  ngOnInit() {
    this.alertService.getNotification().subscribe((notification: Notification) => {
      if (!notification) {
        // clear alerts when an empty alert is received
        this.notifications = [];
        return;
      }

      // add alert to array
      this.notifications.push(notification);
      setTimeout(()=>{
        if(this.notifications && this.notifications.length > 0){
          this.notifications.shift();
        }
      },500000);
    });
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }

    // return css class based on alert type
    switch (notification.type) {
      case NotificationType.Success:
        return 'alert alert-success';
      case NotificationType.Error:
        return 'alert alert-danger';
      case NotificationType.Info:
        return 'alert alert-info';
      case NotificationType.Warning:
        return 'alert alert-warning';
    }
  }
}
