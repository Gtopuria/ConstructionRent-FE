import { Action } from '@ngrx/store';

export interface AppError {
  type: string;
  data: any;
  error: string;
}


export function updateState<TState>(
  state: TState,
  changes: PartialObject<TState>
): TState {
  return { ...state, ...changes } as TState;
}

export type PartialObject<T> = Partial<T> & NonPrimitive & NonArray;

export interface NonArray { forEach?: void; }

export type NonPrimitive = { charAt?: void } & { toFixed?: void } & {
  forEach?: void;
};

export interface ActionWithPayload<T = any> extends Action {
  payload: T;
}
