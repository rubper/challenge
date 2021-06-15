import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" style="width:100%;max-width:200px;">',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
