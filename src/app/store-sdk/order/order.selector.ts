import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.model';


export const orders = createFeatureSelector<OrderState>('order');

export const selectCartItemsCount = createSelector(
	orders,
	(state: OrderState) => state.cart.length
);

export const selectCartItems = createSelector(
	orders,
	(state: OrderState) => state.cart
);

export const selectOrders = createSelector(
	orders,
	(state: OrderState) => state.orders
);

export const selectInvoice = createSelector(
	orders,
	(state: OrderState) => state.invoice
);
