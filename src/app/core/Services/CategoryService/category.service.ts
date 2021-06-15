import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './../../Models/category.model';

import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ResourceService<Category> {

  constructor(protected httpClient: HttpClient) {
    super('categories',httpClient);
  }
}
