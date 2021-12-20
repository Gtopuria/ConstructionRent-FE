import { ActionWithPayload } from '../utils/store-utils';
import { ORDER_ACTION_TYPE } from './order.action';
import { OrderState } from './order.model';


const INITIAL_STATE: OrderState = {
	cart: [],
	orders: [],
	invoice: undefined
};

export const orderReducer = (
	state = INITIAL_STATE,
	action: ActionWithPayload
): OrderState => {
	switch (action.type) {
		case ORDER_ACTION_TYPE.AddToCartSuccess: {
			return {
				...state,
				cart: [...state.cart, action.payload]
			};
		}
		case ORDER_ACTION_TYPE.PlaceRentOrderSuccess: {
			return {
				...state,
				cart: []
			};
		}
		case ORDER_ACTION_TYPE.GetOrdersSuccess: {
			return {
				...state,
				orders: action.payload
			};
		}
		case ORDER_ACTION_TYPE.GetInvoiceSuccess: {
			return {
				...state,
				invoice: action.payload
			};
		}
		case ORDER_ACTION_TYPE.ClearInvoice: {
			return {
				...state,
				invoice: undefined
			};
		}
		default:
			return state;
	}
};
