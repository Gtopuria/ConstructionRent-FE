import * as _ from 'lodash';

import { ActionWithPayload } from '../utils/store-utils';

import { ROUTE_ACTION_TYPE } from './route.action';
import {
	NavigationDirection,
	ResolveEndPayload,
	Route,
	RouteState
} from './route.model';

const INITIAL_STATE: RouteState = {
	isNavigating: false,
	hasHistory: false,
	lastNavigationDirection: NavigationDirection.Forward,
	shouldActivate: undefined
};

export function routeReducer(
	state = INITIAL_STATE,
	action: ActionWithPayload
): RouteState {
	switch (action.type) {
		case ROUTE_ACTION_TYPE.navigationStart: {
			return {
				...state,
				isNavigating: true
			};
		}
		case ROUTE_ACTION_TYPE.resolveEnd: {
			const payload = action.payload as ResolveEndPayload;

			const hasRouteChanged =
				!state.current ||
				state.current.name !== payload.current!.name ||
				!_.isEqual(state.current.params, payload.current.params);

			return {
				...state,
				referer: hasRouteChanged ? state.current : state.referer,
				current: payload.current,
				hasHistory: payload.hasHistory,
				lastNavigationDirection: payload.lastNavigationDirection,
				isNavigating: false
			};
		}
		case ROUTE_ACTION_TYPE.navigationEnd:
		case ROUTE_ACTION_TYPE.navigationCancel: {
			return {
				...state,
				isNavigating: false,
				shouldActivate: undefined
			};
		}
		default:
			return state;
	}
}

function updateCurrentRoute(
	state: RouteState,
	updates: Partial<Route>
): RouteState {
	if (!state.current) {
		return state;
	}

	return {
		...state,
		current: {
			...state.current,
			...updates
		}
	};
}
