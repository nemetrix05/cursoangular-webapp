import { Component } from '@angular/core';

@Component({
    selector: 'tag-home',
    templateUrl: '../views/home.component.html'
})

export class HomeComponent{
    public portada:string;

    constructor(){
        this.portada = "Bienvenidos!"
    }

    ngOnInit(){

    }
}