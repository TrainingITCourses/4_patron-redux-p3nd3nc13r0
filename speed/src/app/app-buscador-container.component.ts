import { Component, OnInit,  ChangeDetectorRef} from '@angular/core';
import { Criterio } from './store/models/Criterio';
import { BuscadorService } from './buscador.service';
import { Status } from './store/models/status';
import { Agency } from './store/models/agency';
import { Launch } from './store/models/launch';
import { MissionType } from './store/models/mission-type';
import { NgForm } from '@angular/forms';
import { GlobalStore, GlobalSlideTypes } from './global-store.state';
import { GlobalActionTypes } from './global-store.action';

 /*  [estado]="estado"
      [agencia]="agencia"
      [tipo]="tipo" */

@Component({
  selector: 'app-buscador-container',
  template: `
    <app-criterios-presenter
      [criterios]="criterios"
      [statuses]="statuses"
      [agencias]="agencias"
      [tipos]="tipos"
      [criterioSeleccionado]="criterioSeleccionado"
      (selectCriterio)="onSelect($event)"
      (buscar)="buscar($event)">
    </app-criterios-presenter>
    <app-contador-presenter
      [contador]="contador">
    </app-contador-presenter>
    <app-resultado-presenter
     [filteredLaunches]="filteredLaunches"
     [launches]="launches"
     >
    </app-resultado-presenter>
  `,
  styles: []
})

export class BuscadorContainerComponent implements OnInit {

  public criterioSeleccionado = {
     estadoSelected: true,
     agenciaSelected: false,
     tipoSelected: false,
     idCriterio: 1
  };


  public contador = { valor: 0 };
  public criterios: Criterio[] = [];
  public statuses: Status[] = [];
  public agencias: Agency[] = [];
  public tipos: MissionType[] = [];
  public launches: Launch[];
  public filteredLaunches: Launch[] = [];

  onSelect(criterioId: number) {
    this.criterioSeleccionado.idCriterio = criterioId;
  }

    buscar = (form: NgForm) => {

      if (this.criterioSeleccionado.idCriterio == 1) {
        this.filteredLaunches = this.launches.filter(
          (launch: Launch) =>
          launch.status == form.value.idParametro
        );
      } else if (this.criterioSeleccionado.idCriterio == 2) {
         this.filteredLaunches = this.launches
          .filter((launch: Launch) => launch.missions.length > 0 && launch.missions[0] != undefined)
          .filter((launch: Launch) => launch.missions[0].agencies != null && launch.missions[0].agencies.length > 0
            && launch.missions[0].agencies[0].id == form.value.idParametro);       

      } else {
        this.filteredLaunches = this.launches
          .filter((launch: Launch) => launch.missions[0] !== undefined)
          .filter((launch: Launch) => launch.missions[0].type == form.value.idParametro);
      }
      this.contador.valor = this.filteredLaunches.length;

    }

  constructor(private buscadorService: BuscadorService,
     private globalStore: GlobalStore) {
    }

  ngOnInit() {

    this.loadData();
    this.criterios = this.buscadorService.getCriterios();
  }

  private loadData() {
    this.buscadorService.getLaunches();
    this.buscadorService.getStatus();
    this.buscadorService.getAgencias();
    this.buscadorService.getTipos();

    this.globalStore.select$(GlobalSlideTypes.launches).subscribe(launches => (this.launches = launches));
    this.globalStore.select$(GlobalSlideTypes.statuses).subscribe(statuses => (this.statuses = statuses));
    this.globalStore.select$(GlobalSlideTypes.agencias).subscribe(agencias => (this.agencias = agencias));
    this.globalStore.select$(GlobalSlideTypes.tipos).subscribe(tipos => (this.tipos = tipos));
  }

}
