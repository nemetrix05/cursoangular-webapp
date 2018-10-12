import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

// Componentes a Importar
import { HomeComponent } from './components/home.component';
import { NotfoundComponent } from './components/notfound.component';
import { ProductosListComponent } from './components/productos.list.component';
import { ProductoAdd } from './components/productos.add.component';

// Rutas

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'productos', component: ProductosListComponent},
    {path: 'createproducto', component: ProductoAdd},
    {path: '**', component: NotfoundComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);