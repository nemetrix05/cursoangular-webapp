import { Component } from '@angular/core';
// Estos modulos son para pasar parametros en la url
import { Router, ActivatedRoute, Params} from '@angular/router';
// Se importa el servicio de los productos
import { ProductoService } from '../services/producto.service';
// Se importa el modelo del producto
import { Producto } from '../models/producto';
// Se Importa el archivo Global
import { GLOBAL } from '../config.global';

@Component({
    selector: 'tag-productos',
    templateUrl: '../views/productos.list.html',
    providers: [ProductoService]
})

export class ProductosListComponent{

    public title:string;

    public productos: Producto[];

    public pathImgApi:string;

    constructor(
        private _router: Router,
        private _routerAct: ActivatedRoute,
        private _productService: ProductoService
    ){
        this.title = 'Listado de productos';
        this.pathImgApi = GLOBAL.imgapi;
    }

    ngOnInit(){

        this._productService.getProducto().subscribe(
            result => {

                // Si el resultado es diferente a 200
                if(result.code != 200){
                    console.log(result);
                }else{
                    this.productos = result.data;    
                }
                
            },

            error => {
                console.log(<any>error);
            }
        );

    }

}