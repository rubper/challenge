import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, OnChanges } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Category } from './../../../../core/Models/category.model';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.scss']
})
export class CategoryIndexComponent implements OnChanges {
  //Por tanto, recibe info usando Input
  @Input()
  categories?: Category[] = []; //un listado de categorias
  //Y envía info usando Output
  @Output()
  categoryDetail = new EventEmitter<number>(); //Envía un id al consultar
  @Output()
  categoryUpdate = new EventEmitter<number>(); //Envía un id al actualizar
  @Output()
  categoryDelete = new EventEmitter<Category>(); //Envía un categoryo al eliminar
  //Las columnas que serán utilizadas en la tabla
  titulosColumnas: string[] = [
      'id',
      'name',
      'main',
      'actions'
    ];
    
    dataSource : MatTableDataSource<Category> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
    ) { 
    }

  ngOnChanges(changes : SimpleChanges): void {
    //destructura categoryos (obtiene categories de changes, y lo almacena en una const llamada categories)
    const { categories } = changes;
    if(categories) {
      this.dataSource.data = categories.currentValue;
    }
  }

}
