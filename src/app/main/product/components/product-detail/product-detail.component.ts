import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/Models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    //inyecta el producto desde el dialogo hacia el componente
    @Inject(MAT_DIALOG_DATA) public product: Product,
    //referencia del dialogo
    private dialogRef: MatDialogRef<ProductDetailComponent>
  ) { }

  ngOnInit(): void {
  }

  //ciera el dialogo
  close(): void {
    this.dialogRef.close();
  }

}
