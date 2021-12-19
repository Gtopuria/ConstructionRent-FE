import { Injectable } from '@angular/core';
import { Equipment } from '../equipment/equipment.model';
import { ActionWithPayload, AppError } from '../utils/store-utils';

export const ACTION_PREFIX = '[Order]';
export const ORDER_ACTION_TYPE = {
	AddToCart: `${ACTION_PREFIX} Add to Cart`,
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
}
