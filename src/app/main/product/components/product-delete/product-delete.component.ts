import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/Models/product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  //inyectar la informacion desde el dialogo al componente
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit(): void {
  }

}
