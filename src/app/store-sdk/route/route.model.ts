import { InjectionToken, Type } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { Dictionary } from '../utils/store-utils';

export const enum NavigationDirection {
	Back = 'back',
	Forward = 'forward'
}

export interface RouteState {
	current?: Route;
	referer?: Route | undefined;
	hasHistory: boolean;
	isNavigating: boolean;
	lastNavigationDirection: NavigationDirection;
	shouldActivate?: boolean;
}

export interface Route {
	/**
	 * name of the route, which will be navigated to
	 */
	name: string;

	/**
	 * external url with all the parameters
	 * e.g.: /en/heroes/batman
	 */
	externalUrl: string;

	/**
	 * navigation to a predefined path, will not include query string or fragment
	 */
	pathName: string;

	/**
	 * Static config data
	 */
	data: Dictionary<any>;

	/**
	 * parameters that are parsed from the URL
	 */
	params?: Dictionary<any>;

	/**
	 * query parameters that are parsed from the URL
	 */
	queryParams?: Dictionary<any>;

	/**
	 * Hash-tag parameters that are parsed from the URL
	 */
	fragment?: string;

	/**
	 * Fallback route, this is used when there is no route in the history stack
	 */
	fallbackRoute?: string;

	/**
	 * Layout component to be loaded on this route
	 *
	 * When specified as `InjectionToken`, it should be provided on root level and resolved using Angular's `Injector`
	 */
	layout?: Type<any> | InjectionToken<Type<any>>;
}

export interface NavigatePayload {
	routeName: string;
	params?: any;
	extras?: NavigationExtras;
}

export interface GuardsCheckEndPayload {
	shouldActivate: boolean;
}

export interface NavigateByCommandPayload {
	commands: any[];
	extras?: NavigationExtras;
}

export interface NavigateByUrlPayload {
	url: string;
	extras?: NavigationExtras;
}

export interface ResolveEndPayload {
	current: Route;
	hasHistory: boolean;
	lastNavigationDirection: NavigationDirection;
}

export interface SetFragmentPayload {
	fragment: string;
	skipScroll?: boolean;
	replaceUrl?: boolean;
}

export interface SetQueryParamsPayload {
	queryParams: Dictionary<any>;
	replaceUrl: boolean;
}
