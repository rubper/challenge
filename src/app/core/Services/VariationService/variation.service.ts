import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Variation } from './../../Models/variation.model';

import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root'
})
export class VariationService extends ResourceService<Variation>{

  constructor(protected httpClient: HttpClient) {
    super('variations',httpClient);
   }
}
