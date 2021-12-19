import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderAction, ORDER_ACTION_TYPE } from './order.action';

import { catchError, map, switchMap } from 'rxjs/operators';
import { ActionWithPayload, AppError } from '../utils/store-utils';
import { of } from 'rxjs';
import { Equipment } from '../equipment/equipment.model';
import { OrderService } from './order.service';

@Injectable()
export class OrderEffect {

	getEquipments$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.AddToCart),
		map((action: ActionWithPayload<Equipment>) => action.payload),
		map((payload) => this.orderActions.AddToCartSuccess(payload))
	));

	constructor(private actions$: Actions,
		private service: OrderService,
		private orderActions: OrderAction) {
	}
}
