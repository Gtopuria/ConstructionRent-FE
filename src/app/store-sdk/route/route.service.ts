import { Location, PlatformLocation } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Route,
	Router,
	RouterStateSnapshot
} from '@angular/router';
import * as _ from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { DocumentRef } from 'src/app/shared/services/document-service';

import { getActivatedRouteSnapshot } from '../utils/route-util';
import { Dictionary } from '../utils/store-utils';
import { RouteConfig } from './route.config';

import {
	NavigateByCommandPayload,
	NavigateByUrlPayload,
	NavigatePayload
} from './route.model';

@Injectable({
	providedIn: 'root'
})
export class RouteService {
	private routeLookup: Dictionary<RouteConfig> = {};
	private parentLookup: Dictionary<RouteConfig | undefined> = {};
	private lazyLoadingEvents$$: Subscription | undefined;

	constructor(
		private documentRef: DocumentRef,
		private router: Router,
		private location: Location,
		private platformLocation: PlatformLocation
	) { }

	/** @internal */
	initialize() {
		if (this.lazyLoadingEvents$$) {
			return;
		}

		const addToLookups = (
			routeConfig: RouteConfig,
			parentConfig?: RouteConfig
		) => {
			if (this.routeLookup[routeConfig.name]) {
				if (!routeConfig.path) {
					this.routeLookup[routeConfig.name] = {
						...routeConfig,
						path: this.routeLookup[routeConfig.name].path
					};
					return;
				}
				throw new Error(
					`[RouteService] registering a route '${routeConfig.name
					}' which already exists!`
				);
			}
			this.routeLookup[routeConfig.name] = routeConfig;
			this.parentLookup[routeConfig.name] = parentConfig;
		};

		this.walkRouteConfig(this.router.config, addToLookups);

	}

	/** @internal */
	dispose() {
		if (!this.lazyLoadingEvents$$) {
			return;
		}

		this.lazyLoadingEvents$$.unsubscribe();
		this.lazyLoadingEvents$$ = undefined;
	}

	/**
	 * Returns a promise that:
	 * - resolves to 'true' when navigation succeeds,
	 * - resolves to 'false' when navigation fails,
	 * - is rejected when an error happens.
	 */
	navigate(payload: NavigatePayload): Promise<boolean> {
		return this.router.navigate([payload.routeName], payload.extras);
	}

	/**
	 * Returns a promise that:
	 * - resolves to 'true' when navigation succeeds,
	 * - resolves to 'false' when navigation fails,
	 * - is rejected when an error happens.
	 */
	navigateByCommand(payload: NavigateByCommandPayload): Promise<boolean> {
		return this.router.navigate(payload.commands, payload.extras);
	}

	/**
	 * Returns a promise that:
	 * - resolves to 'true' when navigation succeeds,
	 * - resolves to 'false' when navigation fails,
	 * - is rejected when an error happens.
	 */
	navigateByUrl(payload: NavigateByUrlPayload): Promise<boolean> {
		return this.router.navigateByUrl(
			this.location.normalize(payload.url),
			payload.extras
		);
	}

	getCurrentExternalUrl() {
		return this.location.prepareExternalUrl(this.router.url.toString());
	}

	getConfigFromStateSnapshot(
		snapshot: RouterStateSnapshot
	): RouteConfig | undefined {
		const activated = getActivatedRouteSnapshot(snapshot);
		return activated ? (activated.routeConfig as RouteConfig) : undefined;
	}

	generateUrl(payload: NavigatePayload, prepareExternalUrl = true): string {
		const commands = this.convertToCommands(
			payload.routeName,
			payload.params
		);
		if (!commands) {
			return '';
		}
		const url = this.router
			.createUrlTree(commands, payload.extras)
			.toString();
		return prepareExternalUrl ? this.location.prepareExternalUrl(url) : url;
	}

	generateUrlFromSnapshot(
		snapshot: ActivatedRouteSnapshot,
		prepareExternalUrl = true
	): string {
		return this.generateUrl(
			{
				routeName: (snapshot.routeConfig as RouteConfig).name,
				params: snapshot.params,
				extras: {
					queryParams: snapshot.queryParams,
					fragment: snapshot.fragment
				}
			},
			prepareExternalUrl
		);
	}

	replacePath(path: string) {
		this.location.replaceState(this.location.normalize(path));
	}

	pushPath(path: string) {
		this.location.go(this.location.normalize(path));
	}

	onHashChange$() {
		return new Observable(observer =>
			this.platformLocation.onHashChange(locationChangeEvent =>
				observer.next(locationChangeEvent)
			)
		);
	}

	onPopState$() {
		return new Observable(observer =>
			this.platformLocation.onPopState(locationChangeEvent =>
				observer.next(locationChangeEvent)
			)
		);
	}

	private walkRouteConfig(
		routes: Route[],
		callback: (config: RouteConfig, parent?: RouteConfig) => void,
		parent?: RouteConfig
	) {
		for (const route of routes) {
			callback(route as RouteConfig, parent);
			if (route.children) {
				this.walkRouteConfig(
					route.children,
					callback,
					route as RouteConfig
				);
			}
		}
	}

	private convertToCommands(
		routeName: string,
		params?: any
	): any[] | undefined {
		const routes: RouteConfig[] = [];
		let config;

		if (!config) {
			return undefined;
		}

		while (config) {
			routes.unshift(config);
			config = this.parentLookup[config.name];
		}

		return _.map(
			_.flatMap(routes, route =>
				route.path!.replace(/^\//, '').split('/')
			),
			segment => {
				if (segment.startsWith(':')) {
					const param = params[segment.substr(1)];
					if (_.isNil(param)) {
						throw new Error(
							`Value for router param '${segment}' not found.`
						);
					}
					return param;
				}
				return segment;
			}
		);
	}

	private getModuleName(routeName: string): string {
		if (routeName) {
			return routeName.split('.')[0];
		}
		return '';
	}
}
