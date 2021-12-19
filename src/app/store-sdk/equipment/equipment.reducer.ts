import { ActionWithPayload } from '../utils/store-utils';
import { EQUIPMENT_ACTION_TYPE } from './equipment.action';
import { EquipmentState } from './equipment.model';


const INITIAL_STATE: EquipmentState = {
  equipments: undefined
};

export const equipmentReducer = (
  state = INITIAL_STATE,
  action: ActionWithPayload
): EquipmentState => {
  switch (action.type) {
    case EQUIPMENT_ACTION_TYPE.GetEquipmentsSuccess: {
      return {
        ...state,
        equipments: action.payload
      };
    }
    default:
      return state;
  }
};
