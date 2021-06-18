import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'challenge';
  shouldRun = true;
  changeRun() : void {
    if(this.shouldRun){
      this.shouldRun = false;
    } else {
      this.shouldRun = true;
    }
  }
}
