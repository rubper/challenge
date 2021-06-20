import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/core/Models/brand.model';
import { BrandService } from 'src/app/core/Services/BrandService/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  brandForm! : FormGroup;
  brands : Brand[] = [];
  filteredCategories: Observable<Brand[]> = of<Brand[]>([]);
  title="";

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) public currentBrand : Brand,
    private dialogRef: MatDialogRef<BrandFormComponent, Brand>
    ) {
      if(currentBrand){
        this.title=`Editando ${currentBrand.name}`;
      } else {
        this.title="Agregar nueva marca"
      }
    }

  ngOnInit(): void {
    this.inicializarForm();
    if(this.currentBrand){
      this.brandForm.patchValue(this.currentBrand);
    }
  }

  inicializarForm(){
    this.brandForm = this.formBuilder.group({
      id:[null],
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(150)]],
    });
  }

  onSubmit(): void {
    this.close(this.brandForm.getRawValue());
  }
  
  close(brand?: Brand): void {
    this.dialogRef.close(brand);
  }

  get nameControl(): FormControl {
    return this.brandForm.get('name') as FormControl;
  }

}
