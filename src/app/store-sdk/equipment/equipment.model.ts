export interface Equipment {
  id: number;
  name: string;
  type: EquipmentType;
}

export enum EquipmentType {
  Regular,
  Heavy,
  Specialized
}

export interface EquipmentState {
    equipments: Equipment[];
}
