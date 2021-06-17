import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryIndexComponent } from './components/category-index/category-index.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryContainer } from './containers/category/category.container';


@NgModule({
  declarations: [
    CategoryIndexComponent,
    CategoryFormComponent,
    CategoryDetailComponent,
    CategoryDeleteComponent,
    CategoryContainer
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
