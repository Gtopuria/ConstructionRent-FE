import { Equipment } from "../equipment/equipment.model";

export interface OrderItem {
	equipmentId: number,
	durationInDays: number
}

export interface OrderState {
	cart: Equipment[];
	orders: Order[],
	invoice: Invoice
}

export interface Order {
	id: string;
	items: OrderItem[];
}

export interface Invoice {
	title: string;
	items: InvoiceItem[];
	totalPrice: number;
	loyaltyPoints: number;
}

export interface InvoiceItem {
	id: number;
	itemName: string;
	durationInDays: number;
	amount: number;
}
