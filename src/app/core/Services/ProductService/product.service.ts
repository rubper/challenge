import { Result } from './../../Models/result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../Models/product.model';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  
  getProducts(): Observable<Result<Product>> {
    const url = 'https://drf-products-api.herokuapp.com/api/products/';
    return this.httpClient.get<Result<Product>>(url);
  }

  getProduct(id:number = 1293496): Observable<Product> {
    const url = 'https://drf-products-api.herokuapp.com/api/products/${id}';
    return this.httpClient.get<Product>(url);
  }
}
