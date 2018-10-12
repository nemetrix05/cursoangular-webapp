import { Component } from '@angular/core';

@Component({
    selector: 'tag-notfound',
    templateUrl: '../views/notfound.component.html'
})

export class NotfoundComponent{
    public title:string;

    constructor(){
        this.title = 'OOOPS! Pagina no encontrada';
    }
}