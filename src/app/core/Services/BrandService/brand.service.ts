import { Result } from './../../Models/result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './../../Models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<Result<Brand>> {
    const url = 'https://drf-products-api.herokuapp.com/api/brands/';
    return this.httpClient.get<Result<Brand>>(url);
  }

  getBrand(id:number = 1): Observable<Brand> {
    const url = 'https://drf-products-api.herokuapp.com/api/brands/${id}';
    return this.httpClient.get<Brand>(url);
  }
}
