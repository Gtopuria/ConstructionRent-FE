import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderAction, ORDER_ACTION_TYPE } from './order.action';

import { catchError, map, switchMap } from 'rxjs/operators';
import { ActionWithPayload, AppError } from '../utils/store-utils';
import { of } from 'rxjs';
import { Equipment } from '../equipment/equipment.model';
import { OrderService } from './order.service';
import { OrderItem } from './order.model';
import { MatSnackBar } from '@angular/material';
import { FEATURE_ROUTES } from 'src/app/core/route/route.const';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffect {

	addEquipmentToCart$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.AddToCart),
		map((action: ActionWithPayload<Equipment>) => action.payload),
		map((payload) => this.orderActions.AddToCartSuccess(payload))
	));


	placeOrder$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.PlaceRentOrder),
		map((action: ActionWithPayload<OrderItem[]>) => action.payload),
		switchMap((payload) =>
			this.service.placeRentOrder(payload).pipe(
				map((response) => {
					if (response.status === 200) {
						return this.orderActions.PlaceRentOrderSuccess()
					}
				}),
				catchError((error: AppError) => of(this.orderActions.PlaceRentOrderFail(error)))
			)
		)
	));

	getOrders$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.GetOrders),
		switchMap(() => this.service.getAll().pipe(
			map((response) => this.orderActions.GetOrdersSuccess(response)),
			catchError((error: AppError) => of(this.orderActions.GetOrdersFail(error)))
		))
	));

	getInvoice$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.GetInvoice),
		map((action: ActionWithPayload<string>) => action.payload),
		switchMap((payload) => this.service.getInvoice(payload).pipe(
			map((response) => this.orderActions.GetInvoiceSuccess(response)),
			catchError((error: AppError) => of(this.orderActions.GetInvoiceFail(error)))
		))
	));

	placeOrderSuccess$ = createEffect(() => this.actions$.pipe(
		ofType(ORDER_ACTION_TYPE.PlaceRentOrderSuccess),
		map(() => {
			this._snackBar.open(
				`Rent order has been placed`, '', { duration: 3000 });
			this.router.navigate([FEATURE_ROUTES.orders])
		})
	), { dispatch: false });

	constructor(private actions$: Actions,
		private router: Router,
		private service: OrderService,
		private orderActions: OrderAction,
		private _snackBar: MatSnackBar) {
	}
}
