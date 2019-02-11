import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorContainerComponent } from './app-buscador-container.component';
import { BusquedaCriteriosPresenterComponent } from './busqueda-criterios-presenter';
import { ResultadoBusquedaPresenterComponent } from './resultado-busqueda-presenter';
import { ContadorPresenterComponent } from './contador-presenter.component';

import { BuscadorService } from './buscador.service';


@NgModule({
  declarations: [
    AppComponent,
    BuscadorContainerComponent,
    BusquedaCriteriosPresenterComponent,
    ResultadoBusquedaPresenterComponent,
    ContadorPresenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BuscadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
