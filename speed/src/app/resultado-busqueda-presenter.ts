import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
  } from '@angular/core';
import { Launch } from './store/models/launch';

  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-resultado-presenter',
    templateUrl: './resultado-busqueda.component.html',
    styleUrls: ['./resultado-busqueda.component.css']
  })
  export class ResultadoBusquedaPresenterComponent implements OnInit {

    @Input() public launches: Launch[];

    @Input() public filteredLaunches: Launch[] = [];

    constructor() {}

    ngOnInit() {}
  }
