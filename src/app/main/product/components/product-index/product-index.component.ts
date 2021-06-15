
import { Component, EventEmitter, Input, OnChanges,  Output, SimpleChanges, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { ProductService } from './../../../../core/Services/ProductService/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from 'src/app/core/Models/product.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss']
})

//El Component actua como child frente al Container
export class ProductIndexComponent implements OnChanges {
  //Por tanto, recibe info usando Input
  @Input()
  products?: Product[] = []; //un listado de productos
  //Y envía info usando Output
  @Output()
  productDetail = new EventEmitter<number>(); //Envía un id al consultar
  @Output()
  productUpdate = new EventEmitter<number>(); //Envía un id al actualizar
  @Output()
  productDelete = new EventEmitter<Product>(); //Envía un producto al eliminar
  //Las columnas que serán utilizadas en la tabla
  titulosColumnas: string[] = [
      'id',
      'brand',
      'category',
      'name',
      'currentPrice',
      'actions'
    ];
    
    dataSource : MatTableDataSource<Product> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private cargandoDialog : MatDialog
    ) { 
        this.cargandoDialog.open(MatProgressSpinner);
    }

  ngOnChanges(changes : SimpleChanges): void {
    //destructura productos (obtiene products de changes, y lo almacena en una const llamada products)
    const { products } = changes;
    if(products) {
      this.dataSource.data = products.currentValue;
      this.cargandoDialog.closeAll();
    }
  }

}

