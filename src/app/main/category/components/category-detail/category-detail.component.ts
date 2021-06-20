import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/Models/category.model';
import { CategoryService } from 'src/app/core/Services/CategoryService/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  mainCategory=""
  constructor(
    @Inject(MAT_DIALOG_DATA) public category: Category,
    private dialogRef: MatDialogRef<CategoryDetailComponent>,
    private categoryService : CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getObject(this.category.id).subscribe(
      {
        next:(cat : Category)=>this.mainCategory = cat.name
      }
    )
  }
  close(): void {
    this.dialogRef.close();
  }

}
