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


const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  'appReducer'
);

const EQUIPMENT_REDUCER: ActionReducerMap<AppEquipmentState> = {
  equipment: equipmentReducer
};

const APP_REDUCERS = {
  ...EQUIPMENT_REDUCER
};

const APP_EFFECTS = [
  EquipmentsEffect
];

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(APP_REDUCER_TOKEN, { metaReducers }),
    EffectsModule.forRoot(APP_EFFECTS)
  ],
  providers: [{ provide: APP_REDUCER_TOKEN, useFactory: _appReducerFactory }]
})
export class StoreSdkModule { }

export function _appReducerFactory() {
  return APP_REDUCERS;
}
