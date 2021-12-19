import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderAction, ORDER_ACTION_TYPE } from './order.action';

import { catchError, map, switchMap } from 'rxjs/operators';
import { ActionWithPayload, AppError } from '../utils/store-utils';
import { of } from 'rxjs';
import { Equipment } from '../equipment/equipment.model';
import { OrderService } from './order.service';
import { OrderItem } from './order.model';

@Injectable()
export class OrderEffect {

	getEquipments$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.AddToCart),
		map((action: ActionWithPayload<Equipment>) => action.payload),
		map((payload) => this.orderActions.AddToCartSuccess(payload))
	));


	placeOrder$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.PlaceRentOrder),
		map((action: ActionWithPayload<OrderItem[]>) => action.payload),
		switchMap((payload) =>
			this.service.PlaceRentOrder(payload).pipe(
				map((response) => {
					if(response.status === 200) {
						return this.orderActions.PlaceRentOrderSuccess()
					}
				}),
				catchError((error: AppError) => of(this.orderActions.PlaceRentOrderFail(error)))
			)
		)
	));

	constructor(private actions$: Actions,
		private service: OrderService,
		private orderActions: OrderAction) {
	}
}
