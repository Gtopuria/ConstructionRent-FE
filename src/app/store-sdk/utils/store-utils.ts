import { Action } from '@ngrx/store';

export interface AppError {
	type: string;
	data: any;
	error: string;
}

export interface ActionWithPayload<T = any> extends Action {
	payload: T;
}

export interface Dictionary<T> {
	[key: string]: T;
}
