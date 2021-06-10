import { LoadingComponent } from './../main/product-index/loading/loading.component';
import { VariationService } from './Services/VariationService/variation.service';
import { ProductService } from './Services/ProductService/product.service';
import { CategoryService } from './Services/CategoryService/category.service';
import { BrandService } from './Services/BrandService/brand.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    BrandService,
    CategoryService,
    ProductService,
    VariationService
  ]
})
export class CoreModule { }
