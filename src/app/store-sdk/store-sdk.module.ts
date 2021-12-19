import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from './state';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { equipmentReducer } from './equipment/equipment.reducer';
import { AppEquipmentState } from './equipment/state';
import { EquipmentsEffect } from './equipment/equipment.effect';
import { HttpClientModule } from '@angular/common/http';
import { RouterState } from './route/state';
import { routeReducer } from './route/route.reducer';
import { RouteEffect } from './route/route.effect';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { OrderEffect } from './order/order.effect';
import { AppOrderState } from './order/state';
import { orderReducer } from './order/order.reducer';


const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
	'appReducer'
);

const EQUIPMENT_REDUCER: ActionReducerMap<AppEquipmentState> = {
	equipment: equipmentReducer
};

const ORDER_REDUCER: ActionReducerMap<AppOrderState> = {
	order: orderReducer
};

const ROUTING_REDUCER: ActionReducerMap<RouterState> = {
	route: routeReducer
};

const APP_REDUCERS = {
	...EQUIPMENT_REDUCER,
	...ROUTING_REDUCER,
	...ORDER_REDUCER

};

const APP_EFFECTS = [
	EquipmentsEffect,
	OrderEffect,
	RouteEffect
];

export function logger(reducer: ActionReducer<AppState>): any {
	// default, no options
	return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
	declarations: [],
	imports: [
		HttpClientModule,
		CommonModule,
		StoreModule.forRoot(APP_REDUCER_TOKEN, { metaReducers }),
		EffectsModule.forRoot(APP_EFFECTS),
		StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer, stateKey: 'router' }),
	],
	providers: [{ provide: APP_REDUCER_TOKEN, useFactory: _appReducerFactory }]
})
export class StoreSdkModule { }

export function _appReducerFactory() {
	return APP_REDUCERS;
}
