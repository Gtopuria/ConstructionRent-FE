import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice, Order, OrderItem } from './order.model';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	constructor(private http: HttpClient) { }

	placeRentOrder(payload: OrderItem[]) {
		return this.http.post<any[]>(`${environment.apiUrl}/orders`, {
			Items: payload
		}, { observe: 'response'} );
	}

	getAll() {
		return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
	}

	//TODO: this should go to separate service.
	getInvoice(orderId: string) {
		return this.http.get<Invoice>(`${environment.apiUrl}/invoices/${orderId}`);
	}

}
