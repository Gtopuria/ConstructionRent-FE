import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

import { ActionWithPayload, Dictionary } from '../utils/store-utils';

import {
	NavigatePayload,
	ResolveEndPayload,
	SetQueryParamsPayload
} from './route.model';

export const ACTION_PREFIX = '[Route]';
export const SYNC_SUFFIX = '[Sync]';
export const ROUTE_ACTION_TYPE = {
	navigate: `${ACTION_PREFIX} Navigate`,
	redirect: `${ACTION_PREFIX} Redirect`,
	navigationStart: `${ACTION_PREFIX} Navigation Start ${SYNC_SUFFIX}`,
	navigationEnd: `${ACTION_PREFIX} Navigation End ${SYNC_SUFFIX}`,
	navigationCancel: `${ACTION_PREFIX} Navigation Cancel ${SYNC_SUFFIX}`,

	replacePath: `${ACTION_PREFIX} Replate Path ${SYNC_SUFFIX}`,

	setQueryParams: `${ACTION_PREFIX} Set Query Params ${SYNC_SUFFIX}`,
	setQueryParamsSuccess: `${ACTION_PREFIX} Set Query Params Success ${SYNC_SUFFIX}`,
	updateQueryParams: `${ACTION_PREFIX} Update Query Params ${SYNC_SUFFIX}`,

	back: `${ACTION_PREFIX} Back ${SYNC_SUFFIX}`,

	resolveEnd: `${ACTION_PREFIX} Resolve End ${SYNC_SUFFIX}`
};
@Injectable({
	providedIn: 'root'
})
export class RouteAction {
	navigate(
		routeName: string,
		params: any = {},
		extras: NavigationExtras = {}
	): ActionWithPayload<NavigatePayload> {
		return {
			type: ROUTE_ACTION_TYPE.navigate,
			payload: { routeName, params, extras }
		};
	}

	redirect(
		routeName: string,
		params: any = {},
		extras: NavigationExtras
	): ActionWithPayload<NavigatePayload> {
		return {
			type: ROUTE_ACTION_TYPE.redirect,
			payload: { routeName, params, extras }
		};
	}

	navigationCancel(): Action {
		return {
			type: ROUTE_ACTION_TYPE.navigationCancel
		};
	}
	replatePath(url: string): ActionWithPayload {
		return {
			type: ROUTE_ACTION_TYPE.replacePath,
			payload: url
		};
	}

	navigationStart() {
		return {
			type: ROUTE_ACTION_TYPE.navigationStart
		};
	}

	navigationEnd(): Action {
		return {
			type: ROUTE_ACTION_TYPE.navigationEnd
		};
	}

	resolveEnd(payload: ResolveEndPayload): ActionWithPayload {
		return {
			type: ROUTE_ACTION_TYPE.resolveEnd,
			payload
		};
	}

	setQueryParams(
		queryParams: Dictionary<any>,
		replaceUrl = true
	): ActionWithPayload<SetQueryParamsPayload> {
		return {
			type: ROUTE_ACTION_TYPE.setQueryParams,
			payload: { queryParams, replaceUrl }
		};
	}

	setQueryParamsSuccess(
		queryParams: Dictionary<any>
	): ActionWithPayload<Dictionary<any>> {
		return {
			type: ROUTE_ACTION_TYPE.setQueryParamsSuccess,
			payload: queryParams
		};
	}
}
