import { Component } from '@angular/core';
import { GLOBAL } from './config.global';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = '@Mercado de pulgas';
  
  path:string;

  public busqueda:string;

  constructor(
    private _router: Router
  ){
    
    this.path = GLOBAL.path;

    // Forza el componente hacer reload
    this._router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }  

  }

  getSearch(){

    let getval = this.busqueda;

    setTimeout(() => {
      this._router.navigated = false;
      this._router.navigate(['/productofound/', getval]);
      }, 0);

    //this._router.navigate(['/productofound/', getval]);

  }

}
