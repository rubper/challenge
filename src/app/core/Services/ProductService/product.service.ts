import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../Models/product.model';

import { ResourceService } from '../resource.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends ResourceService<Product>{

  constructor(protected httpClient: HttpClient) { 
    super('products',httpClient)
  }
}
