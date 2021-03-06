import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Routes
import { routing, appRoutingProviders} from './app.routing';

// Components app
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { NotfoundComponent } from './components/notfound.component';
import { ProductosListComponent } from './components/productos.list.component';
import { ProductoAdd } from './components/productos.add.component';
import { ProductoDetails } from './components/producto.detail.component';
import { ProductoEdit } from './components/producto.edit.component';
import { ProductoFound } from './components/producto.detail.found';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    ProductosListComponent,
    ProductoAdd,
    ProductoDetails,
    ProductoEdit,
    ProductoFound
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule

  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
