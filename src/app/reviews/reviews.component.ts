import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from "@angular/core";
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ServiceModel} from '../_models/service';
import {ReviewModel} from '../_models/review';
import {HttpClient} from '@angular/common/http';
import {ReviewsService} from '../_services/reviews.service';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {
  reviews: ReviewModel[];
  newReview: ReviewModel = new ReviewModel();

  constructor(private ratingConfig: NgbRatingConfig, private httpClient: HttpClient, private reviewsService: ReviewsService, private notificationService: NotificationService, private changeDetectorRef: ChangeDetectorRef) {
    ratingConfig.max = 5;
    // ratingConfig.readonly = true;
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.readReviews().subscribe(reviews =>
      this.reviews = reviews
    )
  }

  createReview() {
    var response = true;
    this.newReview.date = new Date();
    this.reviewsService.createReview(this.newReview).subscribe((resp) => {
      if (!resp) {
        response = false;
      }
    });

    if (response) {
      this.notificationService.success('Recenzia bola vytvorená');
      this.loadReviews();
      this.changeDetectorRef.detectChanges();
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }

  updateReviews() {
    var response = true;
    this.reviews.forEach(review => {
      this.reviewsService.updateReview(review).subscribe((resp) => {
        if (!resp) {
          response = false;
        }
      });
    });
    if (response) {
      this.notificationService.success('Recenzie boli aktualizované');
    }else{
      this.notificationService.error('Niečo sa pokazilo! Skúste neskôr prosím!');
    }
  }
}
