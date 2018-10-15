import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

import { GLOBAL } from '../config.global';

@Component({
    selector: 'tag-details',
    templateUrl: '../views/producto.detail.component.html',
    // Importo el servicio
    providers: [ProductoService]
})

export class ProductoDetails{
    
    public title:string;

    public producto: Producto;

    public pathImgApi:string;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = "Detalle de Producto";

        this.pathImgApi = GLOBAL.imgapi;
        
    }

    ngOnInit(){
        //llamamos el metodo que obtiene los datos
        this.getProducto();
    }

    getProducto(){
        
        // Asi se obtienen los parametros de la url actual, pero solo usamos el id
        this._route.params.forEach((params: Params) => {
            // Aqui tengo acceso a todos los parametros enviados por url
            let id =  params['id'];

            // hacemos llamado al servicio y le pasamos el id del producto

            this._productoService.getDetailProducto(id).subscribe(
                res => {
                    if(res.code == 200){
                        // Le asigno el valor al la propiedad producto que tiene el modelo de datos
                        this.producto = res.mensaje;
                    }else{
                        // Hacer una redireccion
                        this._router.navigate(['/home']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );

        });

    }

}

