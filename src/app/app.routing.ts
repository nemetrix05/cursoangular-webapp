import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

// Componentes a Importar
import { HomeComponent } from './components/home.component';
import { NotfoundComponent } from './components/notfound.component';
import { ProductosListComponent } from './components/productos.list.component';
import { ProductoAdd } from './components/productos.add.component';
import { ProductoDetails } from './components/producto.detail.component';
import { ProductoEdit } from './components/producto.edit.component';
import { ProductoFound } from './components/producto.detail.found';

// Rutas

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'productos', component: ProductosListComponent},
    {path: 'createproducto', component: ProductoAdd},
    {path: 'producto/:id', component: ProductoDetails},
    {path: 'productoedit/:id', component: ProductoEdit},
    {path: 'productofound/:name', component: ProductoFound},
    {path: '**', component: NotfoundComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);