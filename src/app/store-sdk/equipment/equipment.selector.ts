import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EquipmentState } from './equipment.model';


export const equipments = createFeatureSelector<EquipmentState>('equipment');

export const selectEquipments = createSelector(
	equipments,
	(state: EquipmentState) => state.equipments
);
