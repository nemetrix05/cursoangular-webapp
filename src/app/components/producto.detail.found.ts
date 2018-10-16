import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

import { GLOBAL } from '../config.global';

@Component({
    selector: 'tag-found',
    templateUrl: '../views/producto.detail.found.html',
    // Importo el servicio
    providers: [ProductoService]
})

export class ProductoFound{
    
    public title:string;

    public productos: Producto[];

    public pathImgApi:string;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.pathImgApi = GLOBAL.imgapi;
    }

    ngOnInit(){
        //llamamos el metodo que obtiene los datos
        this.findProducto();
    }

    findProducto(){
        
        // Asi se obtienen los parametros de la url actual, pero solo usamos el id
        this._route.params.forEach((params: Params) => {
            // Aqui tengo acceso a todos los parametros enviados por url
            let name =  params['name'];

            this.title = name;

            // hacemos llamado al servicio y le pasamos el id del producto

            this._productoService.searchProducto(name).subscribe(
                res => {
                    if(res.code == 200){
                        // Le asigno el valor al la propiedad producto que tiene el modelo de datos
                        this.productos = res.data;
                    }else{
                        // Hacer una redireccion
                        this.title = name;
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );

        });

    }

    // Metodos de confirmacion borrado

    public seguro;

    deleteConfirm(id){
        this.seguro = id;
    }

    cancelConfirm(){
        this.seguro = null;
    }

    // El componente recibe el id del evento clic y llama al servicio para que borre el producto
    onDeleteProducto(id){
        this._productoService.deleteProducto(id).subscribe(
            response => {
                if(response.Code == 200){
                    //Lista de nuevo los productos
                    this.title = 'Producto Borrado';
                }else{
                    console.log('No se pudo borrar el producto');
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }    

}

