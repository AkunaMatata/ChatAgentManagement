import { NgRedux } from '@angular-redux/store';
import { rootReducer } from './root-reducer';
import { RootStateInterface } from './root-state-interface';

// todo uncomment it when typings will be ready
// import { thunk } from 'redux-thunk';
const thunk: any = require('redux-thunk').default;

export function configureState<TStore extends NgRedux<RootStateInterface>>(store: TStore, initialState = {} as any): TStore {
    store.configureStore(rootReducer, initialState, [thunk]);
    return store;
}
