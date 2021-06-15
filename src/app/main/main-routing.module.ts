import { ProductIndexComponent } from './product/components/product-index/product-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product/components/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProductIndexComponent
  },
  {
    path: 'agregar',
    component: ProductFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
