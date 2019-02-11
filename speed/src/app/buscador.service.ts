import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Status } from './store/models/status';
import { Observable, of } from 'rxjs';
import { Criterio } from './store/models/criterio';
import { Agency } from './store/models/agency';
import { MissionType } from './store/models/mission-type';
import { GlobalStore } from './global-store.state';
import { LoadLaunches, LoadStatuses, LoadAgencias, LoadTipos } from './global-store.action';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  public launches: any[];
  private key = 'launches';
  private urlStatus = 'assets/data/launchstatus.json';
  private urlAgencias = 'assets/data/agencies.json';
  private urlTipos = 'assets/data/missiontypes.json';
  private urlLanzamientos = 'assets/data/launches.json';

  criterios: Criterio[] = [
    { 'id': 1, 'name': 'Estado' },
    { 'id': 2, 'name': 'Agencias' },
    { 'id': 3, 'name': 'Tipo' }
  ];

  constructor(private http: HttpClient, private global: GlobalStore) {
    /* const launches = localStorage.getItem(this.key);
      this.launches = JSON.parse(launches); */
   }

   getStatus() {
    return this.http.get<Status>(this.urlStatus)
      .pipe( map( statuses => statuses['types'] ))
      .subscribe( statuses => {
          this.global.dispatch(new LoadStatuses(statuses));
      });
  }

  getAgencias() {
    return this.http.get<Agency>(this.urlAgencias)
      .pipe( map( data => data['agencies'] ))
      .subscribe( agencias => {
          this.global.dispatch(new LoadAgencias(agencias));
      });
  }

  getTipos() {
    return this.http.get<MissionType>(this.urlTipos)
    .pipe( map( data => data['types'] ))
    .subscribe( tipos => {
        this.global.dispatch(new LoadTipos(tipos));
    });
  }

  public getLaunches = () => {

  const localLaunches =  localStorage.getItem(this.key);
 if (localLaunches) {
    this.global.dispatch(new LoadLaunches(JSON.parse(localLaunches)));
  } else {
    this.http
      .get(this.urlLanzamientos)
      .pipe(map((res: any) => res.launches))
      .subscribe(launches => {
        localStorage.setItem(this.key, JSON.stringify(launches));
        this.global.dispatch(new LoadLaunches(launches));
      });
  }
}

  getCriterios() {
    return this.criterios;
  }
}
