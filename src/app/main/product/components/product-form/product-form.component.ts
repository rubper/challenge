import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryService } from '../../../../core/Services/CategoryService/category.service';
import { BrandService } from '../../../../core/Services/BrandService/brand.service';

import { Result } from '../../../../core/Models/result.model';
import { Brand } from '../../../../core/Models/brand.model';
import { Category } from '../../../../core/Models/category.model';
import { Product } from '../../../../core/Models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  //objeto que agrupa los controles del form
  productForm!: FormGroup;
  //listados
  ListaMarcas : Brand[] = [];
  ListaCategorias : Category[] = [];
  //observables de las listas
  filteredBrands: Observable<Brand[]> = of<Brand[]>([]);
  filteredCategories: Observable<Category[]> = of<Category[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private brandService : BrandService,
    private categoryService : CategoryService,
    //inyectar los datos obtenidos al abrirse por medio de dialogo
    @Inject(MAT_DIALOG_DATA) public product : Product,
    //?
    private dialogRef: MatDialogRef<ProductFormComponent, Product>
    ) { }

  //al inicializar
  ngOnInit(): void {
    //subscribirse al servicio que obtiene las marcas (se obtiene un result)
    this.brandService.getObjects().subscribe( (result : Result<Brand>) => {
      //almacenar el listado del result en ListaMarcas
      this.ListaMarcas = result.results;
      /*si se esta recibiendo un producto por inyeccion, y la marca no es nula
      if(this.product && this.product.brand) {
        //buscar la marca en la lista
        const marcaProducto = this.ListaMarcas.find((marca : Brand)=>marca.id === this.product.brand?.id);
        //settear el valor encontrado
        this.brandControl.setValue(marcaProducto);
      }*/
    });
    this.categoryService.getObjects().subscribe( (result : Result<Category>) => {
      this.ListaCategorias = result.results;
      /*if(this.product) {
        const categoriaProducto = this.ListaCategorias.find((categoria : Category)=>categoria.id === this.product.category.id);
        this.categoryControl.setValue(categoriaProducto);
      }*/
    });
    //filtrar marcas en cambios de valores
    this.filteredBrands = this.brandControl.valueChanges.pipe(
      //valor inicial ''
      startWith(''),
      //del valor recibido, si es un string retornar el valor, si no es string retornar su propiedad name
      map((value) => (typeof value === 'string' ? value : value.name)),
      //del nombre recibido, 
      map((name) =>
        //si el nombre existe, filtrar la lista de marcas y obtener los que coinciden con el nombre recibido
        name ? this.filterBrands(name, this.ListaMarcas) : this.ListaMarcas.slice() //caso contrario retornar todas
      )
    );
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this.filterCategories(name, this.ListaCategorias) : this.ListaCategorias.slice()))
    );
    //inicializar los valores del formulario y sus validadores
    this.inicializarForm();
    //si se esta recibiendo un producto por inyeccion
    if (this.product) {
      //llenar el form con los datos del producto ingresado
      this.productForm.patchValue(this.product);
    }
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

  //filtrar marcas, recibe un valor a buscar y un arreglo donde buscar, retorna un arreglo filtrado
  private filterBrands(valor: string, marcas: Brand[]): Brand[] {
    //pasa a minusculas el valor a buscar
    const filterValue = valor.toLowerCase();
    //del arreglo otorgado, retorna un arreglo que contiene los elementos que coinciden con la condicion
    //  en este caso la condicion es que el nombre de la marca coincida con el que se busca
    return marcas.filter((marca) => (marca.name.toLowerCase().includes(filterValue))
    );
  }

  //filtrar categorias, recibe un valor a buscar y un arreglo donde buscar, retorna un arreglo filtrado
  private filterCategories(valor: string, categorias: Category[] ): Category[] {
    const filterValue = valor.toLowerCase();
    return categorias.filter((categoria) => (categoria.name.toLowerCase().includes(filterValue))
    );
  }

  //al enviar el formulario
  onSubmit(): void {
    //ejecutar close, enviandole los valores del form
    this.close(this.productForm.getRawValue());
  }

  //puede que no reciba datos si el usuario no envia nada
  close(product?: Product): void {
    //cierra el dialogo enviando el producto
    this.dialogRef.close(product);
  }

  //define que se mostrara en los autocomplete
  displayFn(resource: Brand | Category): string {
    //si resource existe, y su propiedad name tambien, entonces devolver name, caso contrario devolver ''
    return resource && resource.name ? resource.name : '';
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
