import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Brand } from './../../Models/brand.model';

import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends ResourceService<Brand> {

  constructor(protected httpClient: HttpClient) {
    super('brands',httpClient);
  }
}
