import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src';
import { Equipment } from '../equipment/equipment.model';
import { ActionWithPayload, AppError } from '../utils/store-utils';
import { OrderItem } from './order.model';

export const ACTION_PREFIX = '[Order]';
export const ORDER_ACTION_TYPE = {
	AddToCart: `${ACTION_PREFIX} Add to Cart`,
	PlaceRentOrder: `${ACTION_PREFIX} Place Rent Order`,
	PlaceRentOrderSuccess: `${ACTION_PREFIX} Place Rent Order Success`,
	PlaceRentOrderFail: `${ACTION_PREFIX} Place Rent Order Fail`,
	AddToCartSuccess: `${ACTION_PREFIX} Add to Cart Success`,
	AddToCartFail: `${ACTION_PREFIX} Add to Cart Fail`,
};

@Injectable({
	providedIn: 'root'
})
export class OrderAction {

	AddToCart(payload: Equipment): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.AddToCart,
			payload: payload
		};
	}

	PlaceRentOrder(payload: OrderItem[]): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.PlaceRentOrder,
			payload: payload
		};
	}

	PlaceRentOrderSuccess(): Action {
		return {
			type: ORDER_ACTION_TYPE.PlaceRentOrderSuccess,
		};
	}

	AddToCartSuccess(payload: Equipment): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.AddToCartSuccess,
			payload
		};
	}

	AddToCartFail(payload: AppError): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.AddToCartFail,
			payload
		};
	}

	PlaceRentOrderFail(payload: AppError): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.PlaceRentOrderFail,
			payload
		};
	}
}
