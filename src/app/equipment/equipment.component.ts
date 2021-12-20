import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { EquipmentAction } from '../store-sdk/equipment/equipment.action';
import { Equipment, EquipmentState } from '../store-sdk/equipment/equipment.model';
import { selectEquipments } from '../store-sdk/equipment/equipment.selector';
import { OrderAction } from '../store-sdk/order/order.action';
import { ignoreNil } from '../store-sdk/utils/ngrx-util';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

	equipments$ = this.store.pipe(
		select(selectEquipments),
		ignoreNil()
	);

	constructor(private store: Store<EquipmentState>,
		private equipmentAction: EquipmentAction,
		private orderAction: OrderAction) { }

	ngOnInit() {
		this.store.dispatch(this.equipmentAction.GetEquipments());
	}

	AddItemToCart(equipment: Equipment) {
		this.store.dispatch(this.orderAction.AddToCart(equipment));
	}

}
