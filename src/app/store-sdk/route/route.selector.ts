import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { RouterState } from './state';

import { NavigationDirection, Route, RouteState } from './route.model';

@Injectable({
	providedIn: 'root'
})
export class RouteSelector {
	getState() {
		return (state: RouterState): RouteState => state.route;
	}

	getCurrent() {
		return (state: RouterState): Route | undefined => state.route.current;
	}

	getCurrent$() {
		return (state$: Observable<RouterState>): Observable<Route> =>
			state$.pipe(
				map(state => state.route.current!),
				distinctUntilChanged(),
				filter(current => !!current)
			);
	}

	getName$() {
		return (state$: Observable<RouterState>): Observable<string> =>
			state$.pipe(
				this.getCurrent$(),
				map(current => current.name)
			);
	}

	getParams<T>() {
		return (state: RouterState): T | undefined => {
			const current = state.route.current;
			return current && (current.params as T);
		};
	}

	getQueryParams<T>() {
		return (state: RouterState): T | undefined => {
			const current = state.route.current;
			return current && (current.queryParams as T);
		};
	}

	getData<T>() {
		return (state: RouterState): T | undefined => {
			const current = state.route.current;
			return current && (current.data as T);
		};
	}

	getFragment() {
		return (state: RouterState): string | undefined =>
			state.route.current && state.route.current.fragment;
	}

	isActive(name: string, params?: any) {
		return (state: RouterState): boolean => {
			const current = state.route.current;
			if (!current) {
				return false;
			}

			return (
				current.name === name &&
				(_.isEmpty(current.params) || _.isEqual(params, current.params))
			);
		};
	}

	isActiveByUrl(
		url: string,
		urlsToMatchFrom: string[],
		ignoreQueryParams?: boolean
	): (state: RouterState) => boolean;

	isActiveByUrl(
		url: string,
		matchExact?: boolean,
		ignoreQueryParams?: boolean
	): (state: RouterState) => boolean;

	isActiveByUrl(
		url: string,
		match?: string[] | boolean,
		ignoreQueryParams?: boolean
	) {
		return (state: RouterState): boolean => {
			const current = state.route.current;
			if (!current) {
				return false;
			}

			if (_.isArray(match)) {
				return (
					url ===
					this.getDeepestCurrentUrlParent(current.externalUrl, match)
				);
			}

			let currentExternalUrl = current.externalUrl;
			let itemUrl = url;

			if (ignoreQueryParams) {
				currentExternalUrl = _.split(currentExternalUrl, '?')[0];
				itemUrl = _.split(itemUrl, '?')[0];
			}

			return match
				? currentExternalUrl === itemUrl
				: currentExternalUrl === itemUrl ||
						_.startsWith(currentExternalUrl, itemUrl + '/');
		};
	}

	hasHistory() {
		return (state: RouterState): boolean => state.route.hasHistory;
	}

	isNavigating() {
		return (state: RouterState): boolean => state.route.isNavigating;
	}

	shouldActivate() {
		return (state: RouterState): boolean | undefined =>
			state.route.shouldActivate;
	}

	getLastNavigationDirection() {
		return (state: RouterState): NavigationDirection =>
			state.route.lastNavigationDirection;
	}

	/**
	 * Returns the referer of the current route (previous route in case of forward navigation).
	 * Does NOT reflect the history, forward and backward navigation considered the same.
	 *
	 * Use it carefully, should not be abused. Most of the time when referer is needed,
	 * the same functionality can be achieved with `routeAction.back` or setting `replaceUrl` to `true`.
	 */
	getReferer() {
		return (state: RouterState): Route | undefined => state.route.referer;
	}

	private getDeepestCurrentUrlParent(
		currentUrl: string,
		urlsToMatchFrom: string[] | boolean
	) {
		return _.reduce(
			urlsToMatchFrom,
			(deepestParent, urlToMatch) => {
				if (
					_.startsWith(currentUrl, urlToMatch) &&
					urlToMatch.length > deepestParent.length
				) {
					return urlToMatch;
				}
				return deepestParent;
			},
			''
		);
	}
}
