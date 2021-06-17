import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<mat-spinner></mat-spinner>',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
