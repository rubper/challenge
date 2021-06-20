import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from './../../../../core/Models/category.model';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public category: Category) { }

  ngOnInit(): void {
  }

}
