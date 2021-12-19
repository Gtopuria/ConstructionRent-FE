import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentAction, EQUIPMENT_ACTION_TYPE } from './equipment.action';
import { EquipmentService } from './equipment.service';

import { catchError, map, switchMap } from 'rxjs/operators';
import { AppError } from '../utils/store-utils';
import { of } from 'rxjs';
import { EquipmentType } from './equipment.model';

@Injectable()
export class EquipmentsEffect {

	getEquipments$ = createEffect(() => this.actions$.pipe(
		ofType(EQUIPMENT_ACTION_TYPE.GetEquipments),
		switchMap(() =>
			this.service.GetAll().pipe(
				map(response => {
					const mapped = response.map(equipemnt => {
						equipemnt.type = EquipmentType[equipemnt.type];
						return {...equipemnt, type: equipemnt.type }
					})
					return this.equipmentActions.GetEquipmentsSuccess(mapped)
				}),
				catchError((error: AppError) => of(this.equipmentActions.GetEquipmentsFail(error)))
			)
		)
	));

	constructor(private actions$: Actions,
		private service: EquipmentService,
		private equipmentActions: EquipmentAction) {
	}
}
