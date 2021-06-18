import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Brand } from './../../../../core/Models/brand.model';

@Component({
  selector: 'app-brand-index',
  templateUrl: './brand-index.component.html',
  styleUrls: ['./brand-index.component.scss']
})
export class BrandIndexComponent implements OnChanges {
  //Por tanto, recibe info usando Input
  @Input()
  brands?: Brand[] = []; //un listado de categorias
  //Y envía info usando Output
  @Output()
  brandDetail = new EventEmitter<number>(); //Envía un id al consultar
  @Output()
  brandUpdate = new EventEmitter<number>(); //Envía un id al actualizar
  @Output()
  brandDelete = new EventEmitter<Brand>(); //Envía una marca al eliminar
  //Las columnas que serán utilizadas en la tabla
  titulosColumnas: string[] = [
      'id',
      'name',
      'actions'
    ];
    
    dataSource : MatTableDataSource<Brand> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    ) { 
    }

  ngOnChanges(changes : SimpleChanges): void {
    //destructura brandos (obtiene categories de changes, y lo almacena en una const llamada categories)
    const { brands } = changes;
    if(brands) {
      this.dataSource.data = brands.currentValue;
    }
  }
}
