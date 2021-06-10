import { Result } from './../../Models/result.model';
import { Variation } from './../../Models/variation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariationService {

  constructor(private httpClient: HttpClient) { }

  getVariations(): Observable<Result<Variation>> {
    const url = 'https://drf-products-api.herokuapp.com/api/variations/';
    return this.httpClient.get<Result<Variation>>(url);
  }

  getVariation(id:number = 1): Observable<Variation> {
    const url = 'https://drf-products-api.herokuapp.com/api/variations/${id}';
    return this.httpClient.get<Variation>(url);
  }
}
