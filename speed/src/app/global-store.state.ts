import { Injectable } from '@angular/core';
import { Global, globalInitialState } from './store/models/global.model';
import { BehaviorSubject } from 'rxjs';
import { GlobalActions, GlobalActionTypes } from './global-store.action';
import { globalStoreReducer } from './global-store.reducer';

@Injectable({
    providedIn: 'root'
  })
export class GlobalStore {
    private state: Global = { ...globalInitialState };
    private launches$ = new BehaviorSubject<any>(this.state.launches);
    private statuses$ = new BehaviorSubject<any>(this.state.statuses);
    private tipos$ = new BehaviorSubject<any>(this.state.tipos);
    private agencias$ = new BehaviorSubject<any>(this.state.agencias);

    constructor() {
    }

    public select$ = (slice: GlobalSlideTypes) => {
        console.log('select$ ... valor slice .. ', slice);
        
        switch (slice) {
          case GlobalSlideTypes.launches:
            return this.launches$.asObservable();
          case GlobalSlideTypes.statuses:
            return this.statuses$.asObservable();
          case GlobalSlideTypes.tipos:
            return this.tipos$.asObservable();
            case GlobalSlideTypes.agencias:
            return this.agencias$.asObservable();
        }
      }

      public selectSnapShot = (slice: GlobalSlideTypes) => {
        switch (slice) {
          case GlobalSlideTypes.launches:
            return [...this.state.launches];
          case GlobalSlideTypes.statuses:
            return [...this.state.statuses];
          case GlobalSlideTypes.tipos:
            return [...this.state.tipos];
        case GlobalSlideTypes.agencias:
            return [...this.state.agencias];
        }
      }

    public dispatch = (action: GlobalActions) => {
        console.log('dispatching...', action);
        this.state = globalStoreReducer(this.state, action);

        switch (action.type) {
          case GlobalActionTypes.LoadLaunches:
            this.launches$.next([...this.state.launches]);
            break;
          case GlobalActionTypes.LoadStatuses:
            this.statuses$.next([...this.state.statuses]);
            break;
          case GlobalActionTypes.LoadTipos:
            this.tipos$.next([...this.state.tipos]);
            break;
          case GlobalActionTypes.LoadAgencias:
            this.agencias$.next([...this.state.agencias]);
            break;
        }
      }

}

export enum GlobalSlideTypes {
    launches = 'launches',
    statuses = 'statuses',
    tipos = 'tipos',
    agencias = 'agencias'
  }
