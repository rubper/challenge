import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Category } from './../../../../core/Models/category.model';
import { Result } from 'src/app/core/Models/result.model';
import { CategoryService } from 'src/app/core/Services/CategoryService/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm! : FormGroup;
  categories : Category[] = [];
  filteredCategories: Observable<Category[]> = of<Category[]>([]);
  title="";

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public category : Category,
    private dialogRef: MatDialogRef<CategoryFormComponent, Category>
  ) {
    if(category){
      this.title=`Editando ${category.name}`;
    } else {
      this.title="Agregar nueva categoria"
    }
  }

  ngOnInit(): void {
    this.inicializarForm();
    this.categoryService.getObjects().subscribe( (result : Result<Category>) => {
      this.categories = result.results;
    });
    this.filteredCategories = this.mainControl.valueChanges.pipe(
      //startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this.filtrarCategorias(name, this.categories) : this.categories.slice()))
    );
    if(this.category){
      this.categoryForm.patchValue(this.category);
    }
  }
  
  inicializarForm(){
    this.categoryForm = this.formBuilder.group({
      id:[null],
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(150)]],
      main: [null],
    });
  }

    
  onSubmit(): void {
    this.close(this.categoryForm.getRawValue());
  }
  
  close(category?: Category): void {
    this.dialogRef.close(category);
  }

  displayFn(cat: Category): string {
    return cat && cat.name ? cat.name : '';
  }

  private filtrarCategorias(valor: string, categorias: Category[] ): Category[] {
    const valorLower = valor.toLowerCase();
    return categorias.filter((categoria) => (categoria.name.toLowerCase().includes(valorLower))
    );
  }
  get nameControl(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }
  get mainControl(): FormControl {
    return this.categoryForm.get('main') as FormControl;
  }
}
