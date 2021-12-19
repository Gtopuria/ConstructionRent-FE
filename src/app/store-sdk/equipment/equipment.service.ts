import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Equipment } from './equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Equipment[]>(`${environment.apiUrl}/equipment`);
  }

}
