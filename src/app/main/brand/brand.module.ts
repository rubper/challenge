import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandIndexComponent } from './components/brand-index/brand-index.component';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandContainer } from './containers/brand/brand.container';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BrandIndexComponent,
    BrandFormComponent,
    BrandDetailComponent,
    BrandDeleteComponent,
    BrandContainer
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatListModule,
    SharedModule
  ]
})
export class BrandModule { }
