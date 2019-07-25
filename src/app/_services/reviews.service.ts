import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerModel } from '../_models/partner';
import { HttpClient } from '@angular/common/http';
import { LinkModel } from '../_models/link';
import { ResponseModel } from '../_models/response';
import {TextModel} from '../_models/text';
import {environment} from '../../environments/environment';
import {ReviewModel} from '../_models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient: HttpClient) { }

  readReviews(): Observable<ReviewModel[]> {
    return this.httpClient.get<ReviewModel[]>(environment.apiUrl + '/review/');
  }

  updateReview(review: ReviewModel): Observable<boolean> {
    return this.httpClient.put<boolean>(
      environment.apiUrl + '/review/', review
    )
  }

  fetchReviews(): Observable<ReviewModel[]> {
    return this.httpClient.get<ReviewModel[]>(environment.apiUrl + '/review/all');
  }
}
