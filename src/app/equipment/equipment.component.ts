import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { EquipmentAction } from '../store-sdk/equipment/equipment.action';
import { EquipmentState } from '../store-sdk/equipment/equipment.model';
import { selectEquipments } from '../store-sdk/equipment/equipment.selector';
import { ignoreNil } from '../store-sdk/utils/ngrx-util';

@Component({
	selector: 'app-equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

	equipments$ = this.store.pipe(
		select(selectEquipments),
		ignoreNil(),
		tap(res => {
			console.log("🚀 ~ file: equipment.component.ts ~ line 25 ~ EquipmentComponent ~ ngOnInit ~ res", res)
		})
	);

	constructor(private store: Store<EquipmentState>,
		private action: EquipmentAction) { }

	ngOnInit() {
		this.store.dispatch(this.action.GetEquipments());

	}

}
