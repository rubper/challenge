import { ProductIndexComponent } from './product-index/product-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [
  {
    path: '',
    component: ProductIndexComponent
  },
  {
    path: 'agregar',
    component: ProductCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
