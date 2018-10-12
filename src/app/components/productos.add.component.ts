import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

import { GLOBAL } from '../config.global';

@Component({
    selector: 'tag-add',
    templateUrl: '../views/productos.add.component.html',
    providers: [ProductoService]
})

export class ProductoAdd{

    public title:string;

    public producto: Producto;

    // Validaciones Form
    public msnSuccess:string;
    public msnError:string;

    // Metodo para enviar el archivo
    public filesToUpload;
    public resultUpload;    

    constructor(
        private _productoservice: ProductoService,
        private _activateroute: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Crear Producto';

        this.producto = new Producto (0,'','',0,'','');
    }

    onSubmit(){
        console.log(this.producto);

        if(this.filesToUpload && this.filesToUpload.length >= 1){
                // Se accede al servicio, para subir la imagen
                this._productoservice.getImgProducto(GLOBAL.urlapi+'imagemoto', [], this.filesToUpload).then((result) => {
                    // Me llegan la imagen procesada con su nombre, guardarla en una propiedad siempre
                    this.resultUpload = result;
                    this.producto.imagen = this.resultUpload.filename;
                    // Se guarda con imagen
                    this.saveProducto();
                    console.log(result);

                }, (error) =>{
                    console.log(error);
                });
        }else{
            // Se guarda si imagen
            this.saveProducto();
        }
    }

    // Se separa el envio de la informacion en un metodo aparte, para que se pueda enviar con o sin imagen
    saveProducto(){
        this._productoservice.addProducto(this.producto).subscribe(
            response => {
                if(response.code == 200){
                    // Forma de redirigir una pagina
                    //this._router.navigate(['/productos']);
                    this.msnSuccess = 'El producto ha sido guardado :)';
                }else{
                    console.log(response);
                    this.msnError = 'Error al guardar el producto';
                }
            },
            error => {
                console.log(<any>error);
            }
        );        
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}