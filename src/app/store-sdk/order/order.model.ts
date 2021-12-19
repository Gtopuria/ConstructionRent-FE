import { Equipment } from "../equipment/equipment.model";

export interface OrderItem {
	equipmentId: number,
	durationInDays: number
}

export interface OrderState {
	cart: Equipment[];
}
