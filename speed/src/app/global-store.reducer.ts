import { globalInitialState, Global } from './store/models/global.model';
import { GlobalActions, GlobalActionTypes } from './global-store.action';


export function globalStoreReducer(
  state = globalInitialState,
  action: GlobalActions
): Global {
  const result = { ...state };
  switch (action.type) {
    case GlobalActionTypes.LoadLaunches:
      result.launches = action.payload;
      break;
    case GlobalActionTypes.LoadStatuses:
      result.statuses = action.payload;
      break;
    case GlobalActionTypes.LoadTipos:
      result.tipos = action.payload;
      break;
    case GlobalActionTypes.LoadAgencias:
      result.agencias = action.payload;
      break;
  }
  return result;
}
