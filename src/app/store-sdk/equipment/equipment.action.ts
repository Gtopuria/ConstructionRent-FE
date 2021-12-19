import { Injectable } from '@angular/core';
import { ActionWithPayload, AppError } from '../utils/store-utils';

import { Equipment } from './equipment.model';


export const ACTION_PREFIX = '[Equipment]';
export const EQUIPMENT_ACTION_TYPE = {
  GetEquipments: `${ACTION_PREFIX} Get Equipments`,
  GetEquipmentsSuccess: `${ACTION_PREFIX} Get Equipments Success`,
  GetEquipmentsFail: `${ACTION_PREFIX} Get Equipments Fail`,
};

@Injectable({
  providedIn: 'root'
})
export class EquipmentAction {

  GetEquipments() {
    return {
      type: EQUIPMENT_ACTION_TYPE.GetEquipments
    };
  }

  GetEquipmentsSuccess(payload: Equipment[]): ActionWithPayload {
    return {
      type: EQUIPMENT_ACTION_TYPE.GetEquipmentsSuccess,
      payload
    };
  }

  GetEquipmentsFail(payload: AppError): ActionWithPayload {
    return {
      type: EQUIPMENT_ACTION_TYPE.GetEquipmentsFail,
      payload
    };
  }
}
