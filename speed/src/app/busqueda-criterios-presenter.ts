import { Criterio } from './store/models/criterio';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter
  } from '@angular/core';
import { Status } from './store/models/status';
import { Agency } from './store/models/agency';
import { MissionType } from './store/models/mission-type';
import { FormsModule, NgForm } from '@angular/forms';

  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-criterios-presenter',
    templateUrl: './buscador-criterios-presenter.component.html'
  })

  export class BusquedaCriteriosPresenterComponent implements OnInit {

    /* @Input() public estado: boolean;
    @Input() public agencia: boolean;
    @Input() public tipo: boolean; */
    @Input() public criterioSeleccionado = {
      estadoSelected: Boolean,
      agenciaSelected: Boolean,
      tipoSelected: Boolean,
      idCriterio: Number
   };
    @Input() public criterios: Criterio [];
    @Input() public statuses: Status [];
    @Input() public agencias: Agency [];
    @Input() public tipos: MissionType [];

    @Output() public selectCriterio = new EventEmitter();
    @Output() public buscar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    public onSelect = (criterioId: Number) => {
        this.selectCriterio.emit(criterioId);
    }

    buscarClicked(form: NgForm) {
      this.buscar.emit(form);
    }

  }
