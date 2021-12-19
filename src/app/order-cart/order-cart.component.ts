import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Equipment } from '../store-sdk/equipment/equipment.model';
import { OrderAction } from '../store-sdk/order/order.action';
import { OrderState } from '../store-sdk/order/order.model';
import { selectCartItems } from '../store-sdk/order/order.selector';
import { ignoreNil } from '../store-sdk/utils/ngrx-util';

@Component({
	selector: 'app-order-cart',
	templateUrl: './order-cart.component.html',
	styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit, OnDestroy {

	submitted = false;
	items: FormArray;
	cartItems: Equipment[];
	orderForm = this.formBuilder.group({
		items: this.formBuilder.array([])
	});
	cartItems$$ = this.store.pipe(
		select(selectCartItems),
		ignoreNil(),
		tap(items => {
			this.cartItems = items;
			this.cartItems.forEach(item => {
				this.orderFormItems.push(this.formBuilder.group({
					equipmentId: [item.id, Validators.required],
					name: [item.name, Validators.required],
					durationInDays: ['', [Validators.required]]
				}));
			})
		})
	).subscribe();


	constructor(private store: Store<OrderState>, private formBuilder: FormBuilder,
		private orderAction: OrderAction) { }

	ngOnDestroy(): void {
		if (this.cartItems$$) {
			this.cartItems$$.unsubscribe();
		}
	}

	get orderFormControls() { return this.orderForm.controls; }
	get orderFormItems() { return this.orderFormControls.items as FormArray; }

	ngOnInit() {
	}

	rent() {
		let orderItems = [];
		this.orderForm.controls.items.value.forEach(item => {
			orderItems.push({ equipmentId: item.equipmentId, durationInDays: item.durationInDays})
		})
		this.store.dispatch(this.orderAction.PlaceRentOrder(orderItems));
	}

}
