import { ActionWithPayload } from '../utils/store-utils';
import { ORDER_ACTION_TYPE } from './order.action';
import { OrderState } from './order.model';


const INITIAL_STATE: OrderState = {
	cart: []
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
		default:
			return state;
	}
};
