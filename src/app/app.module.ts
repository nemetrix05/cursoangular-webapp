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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    ProductosListComponent,
    ProductoAdd
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
