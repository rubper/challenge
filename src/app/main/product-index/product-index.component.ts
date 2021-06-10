
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ProductService } from './../../core/Services/ProductService/product.service';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { LoadingComponent } from './../../core/Components/loading/loading.component';
import { Product } from 'src/app/core/Models/product.model';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss']
})

export class ProductIndexComponent implements OnInit {
  titulosColumnas: string[] = [
      'id',
      'brand',
      'category',
      'variations',
      'name',
      'currentPrice',
      'rawPrice',
      'likesCount',
      'discount',
      'isNew',
      'model',
      'url',
      'imageUrl'
    ];
    
    dataSource = new MatTableDataSource<Product>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private productService : ProductService,
      private nuevoProductoDialog : MatDialog,
      private cargandoDialog : MatDialog
    ) { 
        this.cargandoDialog.open(LoadingComponent);
    }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(result => {
        this.dataSource.data = result.results
        this.cargandoDialog.closeAll();
    })
    this.dataSource.paginator = this.paginator
  }
  abrirDialogoNuevo(){
    var nuevoProductoDialogRef = this.nuevoProductoDialog.open(ProductCreateComponent);
  }

}

