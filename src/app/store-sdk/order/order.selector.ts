import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.model';


export const orders = createFeatureSelector<OrderState>('order');

export const selectCartItemsCount = createSelector(
	orders,
	(state: OrderState) => state.cart.length
);
