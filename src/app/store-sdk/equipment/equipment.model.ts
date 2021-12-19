export interface Equipment {
	id: number;
	name: string;
	type: string;
}

export enum EquipmentType {
	Regular,
	Heavy,
	Specialized
}

export interface EquipmentState {
	equipments: Equipment[];
}
