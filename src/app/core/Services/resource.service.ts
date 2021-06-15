import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resource } from './../Models/resource.model';
import { Result } from './../Models/result.model';
import { environment } from 'src/environments/environment';

export abstract class ResourceService <T extends Resource> {

    private API_URL = `${environment.apiUrl}`;
  
    constructor(
      endpoint: string,
      protected httpClient: HttpClient
      ) {
      this.API_URL = this.API_URL.concat(`${endpoint}/`)
    }
  
    getObjects(page: number = 1, page_size: number = 10): Observable<Result<T>> {
      return this.httpClient.get<Result<T>>(this.API_URL, {
        params: { page: page.toString(), page_size: page_size.toString()},
      });
    }
  
    getObject(id: number): Observable<T> {
      return this.httpClient.get<T>(`${this.API_URL}${id}`);
    }
  
    updateObject(resource: T): Observable<T> {
      return this.httpClient.put<T>(`${this.API_URL}${resource.id}/`, resource);
    }
  
    postObject(resource: T): Observable<T> {
      return this.httpClient.post<T>(`${this.API_URL}`, resource);
    }
  
    deleteProduct(id: number): Observable<HttpResponse<never>> {
      return this.httpClient.delete<never>(`${this.API_URL}${id}`,{ observe: 'response' });
    }
  }
