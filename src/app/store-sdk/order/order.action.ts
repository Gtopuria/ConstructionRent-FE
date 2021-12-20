import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store/src';
import { Equipment } from '../equipment/equipment.model';
import { ActionWithPayload, AppError } from '../utils/store-utils';
import { Invoice, OrderItem } from './order.model';

export const ACTION_PREFIX = '[Order]';
export const ORDER_ACTION_TYPE = {
	AddToCart: `${ACTION_PREFIX} Add to Cart`,
	GetOrders: `${ACTION_PREFIX} Get Orders`,
	GetInvoice: `${ACTION_PREFIX} Get Invoice`,
	ClearInvoice: `${ACTION_PREFIX} Clear Invoice`,
	GetInvoiceSuccess: `${ACTION_PREFIX} Get Invoice Success`,
	GetInvoiceFail: `${ACTION_PREFIX} Get Invoice Fail`,
	GetOrdersSuccess: `${ACTION_PREFIX} Get Orders Success`,
	GetOrdersFail: `${ACTION_PREFIX} Get Orders Fail`,
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

	GetOrders(): Action {
		return {
			type: ORDER_ACTION_TYPE.GetOrders
		};
	}

	ClearInvoice(): Action {
		return {
			type: ORDER_ACTION_TYPE.ClearInvoice
		};
	}

	GetInvoice(payload: string): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.GetInvoice,
			payload
		};
	}

	GetInvoiceSuccess(payload: Invoice): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.GetInvoiceSuccess,
			payload
		};
	}

	GetInvoiceFail(payload: AppError): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.GetInvoiceFail,
			payload
		};
	}

	GetOrdersSuccess(payload: any): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.GetOrdersSuccess,
			payload
		};
	}

	GetOrdersFail(payload: AppError): ActionWithPayload {
		return {
			type: ORDER_ACTION_TYPE.GetOrdersFail,
			payload
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
