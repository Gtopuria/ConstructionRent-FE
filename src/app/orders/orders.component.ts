import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { OrderAction } from '../store-sdk/order/order.action';
import { OrderState } from '../store-sdk/order/order.model';
import { selectInvoice, selectOrders } from '../store-sdk/order/order.selector';
import { ignoreNil } from '../store-sdk/utils/ngrx-util';
import autoTable from 'jspdf-autotable';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

	invoice$$: Subscription;
	orders$ = this.store.pipe(
		select(selectOrders),
		ignoreNil()
	);

	constructor(private store: Store<OrderState>, private orderAction: OrderAction) { }

	ngOnDestroy(): void {
		if (this.invoice$$) {
			this.invoice$$.unsubscribe();
		}
	}

	ngOnInit() {
		this.store.dispatch(this.orderAction.GetOrders());
	}

	getInvoice(id: string) {
		this.store.dispatch(this.orderAction.GetInvoice(id));
		this.invoice$$ = this.store.pipe(
			select(selectInvoice),
			ignoreNil(),
			take(1),
			tap(invoice => {
				const pdf = new jsPDF(); // Generates PDF in portrait mode
				pdf.setFontSize(22);
				const t = invoice.title
				pdf.text(t, 10, 15);
				pdf.setFontSize(18);
				pdf.text('Equipments', 10, 30);
				pdf.setFontSize(12);
				pdf.text(`Total Price: ${invoice.totalPrice}`, 10, 40);
				pdf.text(`Loyalty points: ${invoice.loyaltyPoints}`, 10, 45);
				autoTable(pdf, {
					margin: { right: 0, left: 10 },
					head: this.headRows(),
					body: invoice.items as any[],
					startY: 50,
					rowPageBreak: 'auto',
					bodyStyles: { valign: 'top' }
				});
				pdf.save(`${t}.pdf`);
			})
		).subscribe();
	}

	headRows() {
		return [
			{
				itemName: 'Name',
				durationInDays: 'Rent Duration Days(s)',
				amount: 'Amount'
			}
		];
	}

}
