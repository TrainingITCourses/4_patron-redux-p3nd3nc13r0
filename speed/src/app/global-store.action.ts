export enum GlobalActionTypes {
    LoadLaunches = '[Global] LoadLaunches',
    LoadStatuses = '[Global] LoadStatuses',
    LoadTipos = '[Global] LoadTipos',
    LoadAgencias = '[Global] LoadAgencias',
  }

  export interface Action {
    readonly type: GlobalActionTypes;
    readonly payload: any;
  }

  export class LoadLaunches implements Action {
    public readonly type = GlobalActionTypes.LoadLaunches;
    constructor(public readonly payload: any[]) {
    }
  }

  export class LoadStatuses implements Action {
    public readonly type = GlobalActionTypes.LoadStatuses;
    constructor(public readonly payload: any[]) {}
  }

  export class LoadTipos implements Action {
    public readonly type = GlobalActionTypes.LoadTipos;
    constructor(public readonly payload: any[]) {}
  }

  export class LoadAgencias implements Action {
    public readonly type = GlobalActionTypes.LoadAgencias;
    constructor(public readonly payload: any[]) {}
  }

  export type GlobalActions = LoadLaunches | LoadStatuses | LoadTipos | LoadAgencias;
