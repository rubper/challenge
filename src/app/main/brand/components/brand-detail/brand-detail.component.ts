import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/core/Models/brand.model';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss']
})
export class BrandDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentBrand: Brand,
    private dialogRef: MatDialogRef<BrandDetailComponent>
  ) { }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }

}
