import { Result } from './../../Models/result.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './../../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Result<Category>> {
    const url = 'https://drf-products-api.herokuapp.com/api/categories/';
    return this.httpClient.get<Result<Category>>(url);
  }

  getCategory(id:number = 1): Observable<Category> {
    const url = 'https://drf-products-api.herokuapp.com/api/categories/${id}';
    return this.httpClient.get<Category>(url);
  }
}
