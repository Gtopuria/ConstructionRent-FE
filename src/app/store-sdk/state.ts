import { EquipmentState } from './equipment/equipment.model';
import { AppEquipmentState } from './equipment/state';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
  equipment: EquipmentState;
}
