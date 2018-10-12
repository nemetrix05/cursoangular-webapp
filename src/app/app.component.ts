import { Component } from '@angular/core';
import { GLOBAL } from './config.global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = '@Mercado de pulgas';
  
  path:string;

  constructor(){
    
    this.path = GLOBAL.path;

  }


}
