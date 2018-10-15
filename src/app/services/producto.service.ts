import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../config.global';
import { Producto } from '../models/producto';

@Injectable()
export class ProductoService{

    // Guarda la URL de la API del archivo constans
    public url:string;

    constructor(
        private _http:Http
    ){
        this.url = GLOBAL.urlapi; 
    }


    // Servicio para borrar Producto
    deleteProducto(id){
        return this._http.get(this.url+'deletemoto/'+id)
                    .map(res => res.json());
    }


    // Servicio que lista los productos
    getProducto(){
        return this._http.get(this.url+'listmotos').map(response => response.json());
    }

    // Servicio que captura el id del producto y hace una peticion AJAX http para obtener los detalles

    getDetailProducto(id){
        // Usamos el metodo del api para obtener un producto en especial
        return this._http.get(this.url+'getmoto/'+id).map(response => response.json());
    }

    // Metodo para actualizar un producto
    editProducto(id, producto: Producto){
        let json = JSON.stringify(producto);
        let params = "json="+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        
        // Hace la peticion Ajax, pero le envia el ID
        return this._http.post(this.url+'updatemoto/'+id, params, {headers: headers})
                .map(res => res.json());
    }


    // Servicio que añade los productos
    addProducto(producto: Producto){
        //Recibe el objeto del formulario en el modelo de producto, y lo convierte a json usable
        let json = JSON.stringify(producto);
        //Envia el objeto en el nombre json que es como lo interpreta el backend
        let params = 'json='+json;
        //Tipo de contenido
        let headers = new Headers({
            'Content-Type':'application/x-www-form-urlencoded'
        });

        // Envia el objeto ya convertido en json al API
        return this._http.post(this.url+'savemoto', params, {headers: headers})
            .map(res => res.json());
    }

    // Servicio para subir imagen

    getImgProducto(url: string, params: Array<string>, files: Array<File>){
        // Se crea una promesa para obtener la imagen y pasarla al backend
        return new Promise((resolve, reject)=>{
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                // Saca el nombre de cada imagen que se envia
                formData.append('uploads[]', files[i], files[i].name);
            }

            // Convierte los datos recibidos en Objetos Json Usables
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            // Envia los datos al API
            xhr.open("POST", url, true);
            xhr.send(formData);

        });
    }

}