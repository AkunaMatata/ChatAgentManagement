import { NgRedux } from '@angular-redux/store';
import { Injectable, NgZone } from '@angular/core';
import { Action } from 'redux';

/**
 * Adapter for ngRedux to extend basic behaviour of ngRedux
 */
@Injectable()
export class Store<TAppState> extends NgRedux<TAppState> {

    /**
     * Creates an instance of Store
     * @param ngZone Zone adapter for the angular.
     * @constructor
     */
    constructor(ngZone: NgZone) {
        super(ngZone);
    }

    /**
     * Dispatches asynchronous action.
     * @param asyncAction asynchronous action to dispatch.
     * @return action result promise.
     */
    public dispatchAsync<T>(asyncAction: (dispatch: <A extends Action>(action: A) => any) => Promise<T>): Promise<T> {
        return this.dispatch(asyncAction as any);
    };
}
