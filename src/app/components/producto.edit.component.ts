import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../config.global';

@Component({
    selector: 'tag-edit',
    templateUrl: '../views/producto.edit.component.html',
    providers: [ProductoService]
})

export class ProductoEdit{

    public title:string;
    public producto: Producto;

    public filesToUpload;
    public resultUpload;

    public imgPath:string;

    public msnSuccess:string;
    public msnError:string;

    // Creamos propiedad para cargar una miniatura en el campo input
    public is_file:boolean;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Editar Producto';

        this.imgPath = GLOBAL.imgapi;

        this.is_file = true;
    }

    // Cargan los dato del producto que tenia
    ngOnInit(){
        this.getProducto();
    }

    // Obtiene los datos por ID
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

    onSubmit(){

        if(this.filesToUpload && this.filesToUpload.length >= 1){
                // Se accede al servicio, para subir la imagen
                this._productoService.getImgProducto(GLOBAL.urlapi+'imagemoto', [], this.filesToUpload).then((result) => {
                    // Me llegan la imagen procesada con su nombre, guardarla en una propiedad siempre
                    this.resultUpload = result;
                    this.producto.imagen = this.resultUpload.filename;
                    // Se guarda con imagen
                    this.updateProducto();

                }, (error) =>{
                    console.log(error);
                });
        }else{
            // Se guarda sin imagen
            this.updateProducto();
        }
    }

    // Se separa el envio de la informacion en un metodo aparte, para que se pueda enviar con o sin imagen
    updateProducto(){

        console.log(this.producto);

        this._route.params.forEach((params: Params) => {
            // Aqui tengo acceso a todos los parametros enviados por url
            let id = params['id'];

            this._productoService.editProducto(id, this.producto).subscribe(
                response => {
                    if(response.code == 200){
                        // Forma de redirigir una pagina                        
                        this.msnSuccess = 'El producto ha sido Actualizado!';
                        //this._router.navigate(['/getmoto/'+id]);
                    }else{
                        this.msnError = 'Error al actualizar el producto';
                    }
                },
                error => {
                    console.log(error);
                }
            );      
        
        });
    }

    // Solo obtiene el nombre del archivo seleccionado

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}