import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from './order.model';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	constructor(private http: HttpClient) { }

	PlaceRentOrder(payload: OrderItem[]) {
		return this.http.post<any[]>(`${environment.apiUrl}/orders`, {
			Items: payload
		}, { observe: 'response'} );
	}

}
