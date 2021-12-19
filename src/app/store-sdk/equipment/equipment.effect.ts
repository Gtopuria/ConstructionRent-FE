import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentAction, EQUIPMENT_ACTION_TYPE } from './equipment.action';
import { EquipmentService } from './equipment.service';

import { catchError, map, switchMap } from 'rxjs/operators';
import { AppError } from '../utils/store-utils';
import { of } from 'rxjs';

@Injectable()
export class EquipmentsEffect {

  getEquipments$ = createEffect(() => this.actions$.pipe(
    ofType(EQUIPMENT_ACTION_TYPE.GetEquipments),
    switchMap(() =>
      this.service.GetAll().pipe(
        map(response => this.equipmentActions.GetEquipmentsSuccess(response)),
        catchError((error: AppError) => of(this.equipmentActions.GetEquipmentsFail(error)))
      )
    )
  ));

  constructor(private actions$: Actions,
              private service: EquipmentService,
              private equipmentActions: EquipmentAction) {
  }
}
