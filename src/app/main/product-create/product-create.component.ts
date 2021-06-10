import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { CategoryService } from './../../core/Services/CategoryService/category.service';
import { BrandService } from './../../core/Services/BrandService/brand.service';

import { Result } from './../../core/Models/result.model';
import { Brand } from './../../core/Models/brand.model';
import { Category } from './../../core/Models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productForm!: FormGroup;
  ListaMarcas : Brand[] = [];
  ListaCategorias : Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private brandService : BrandService,
    private categoryService : CategoryService
    ) { }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe( (result : Result<Brand>) => {
      this.ListaMarcas = result.results;
    });
    this.categoryService.getCategories().subscribe( (result : Result<Category>) => {
      this.ListaCategorias = result.results;
    });
    this.inicializarForm();
  }

  inicializarForm(){
    this.productForm = this.formBuilder.group({
      brand: [null, Validators.required],
      category: [null, Validators.required],
      variations: ['', Validators.required],
      name: ['', [Validators.required,Validators.minLength(4)]],
      currentPrice: ['', Validators.required],
      rawPrice: ['', Validators.required],
      likesCount: [0, [Validators.required,Validators.min(0)]],
      discount: [0.00, [Validators.required,Validators.min(0.00)]],
      isNew: [true, Validators.required],
      model: ['', Validators.required],
      url: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  get brandControl(): FormControl {
    return this.productForm.get('brand') as FormControl;
  }
  get categoryControl(): FormControl {
    return this.productForm.get('category') as FormControl;
  }
  get variationsControl(): FormControl {
    return this.productForm.get('variations') as FormControl;
  }
  get nameControl(): FormControl {
    return this.productForm.get('name') as FormControl;
  }
  get currentPriceControl(): FormControl {
    return this.productForm.get('currentPrice') as FormControl;
  }
  get rawPriceControl(): FormControl {
    return this.productForm.get('rawPrice') as FormControl;
  }
  get likesCountControl(): FormControl {
    return this.productForm.get('likesCount') as FormControl;
  }
  get discountControl(): FormControl {
    return this.productForm.get('discount') as FormControl;
  }
  get isNewControl(): FormControl {
    return this.productForm.get('isNew') as FormControl;
  }
  get modelControl(): FormControl {
    return this.productForm.get('model') as FormControl;
  }
  get urlControl(): FormControl {
    return this.productForm.get('url') as FormControl;
  }
  get imageUrlControl(): FormControl {
    return this.productForm.get('imageUrl') as FormControl;
  }
}
