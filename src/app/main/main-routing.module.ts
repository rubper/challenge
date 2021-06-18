import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m=>m.ProductModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m=>m.CategoryModule)
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then(m=>m.BrandModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
