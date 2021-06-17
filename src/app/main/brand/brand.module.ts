import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandIndexComponent } from './components/brand-index/brand-index.component';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandComponent } from './containers/brand/brand.component';


@NgModule({
  declarations: [
    BrandIndexComponent,
    BrandFormComponent,
    BrandDetailComponent,
    BrandDeleteComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
