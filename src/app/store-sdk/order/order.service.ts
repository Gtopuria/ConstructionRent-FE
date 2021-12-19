import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	constructor(private http: HttpClient) { }

	GetAll() {
		return this.http.get<any[]>(`${environment.apiUrl}/equipment`);
	}

}
