import { InjectionToken, Type } from '@angular/core';
import { Route } from '@angular/router';
import { Dictionary } from '../utils/store-utils';

export interface RouteConfig extends Route {
	/**
	 * TODO: Get rid of the `name` abstraction and use the neutral path instead simiar to angular.
	 */
	name: string;

	/**
	 * `parent` only refers to the url structure and used only for localization.
	 * It doesn't mean an actual hierarchy in the config.
	 * TODO: Angular has the concept of `children` in the config so it would be cleaner to get rid of our `parent` abstraction
	 */
	parent?: string;

	/**
	 * When not `true` and the current and previous route uses the same component,
	 * the component instance will be shared between the 2 routes.
	 * @example accordions can have different urls without recreating the entire page
	 */
	disableComponentSharing?: boolean;

	/**
	 * Fallback route, this is used when there is no route in the history stack.
	 */
	fallbackRoute?: string;

	/**
	 * To be used to provide alternative deeplink url for the route.
	 */
	deeplinkPath?: string;

	/**
	 * Layout component to be loaded on this route.
	 *
	 * When specified as `InjectionToken`, it should be provided on root level and resolved using Angular's `Injector`
	 */
	layout?: Type<any> | InjectionToken<Type<any>>;
}

export interface RouterConfig {
	unknownRoute: string;
	localizedRoutes: Dictionary<LocalizedRoute>;
	trustedDeeplinkProtocols?: string[];
	defaultFallbackRoute?: string;
	enableTracing?: boolean | (() => boolean);
	preloadAllLazyModules?: boolean;
	disabledRoutes?: string[];
}

export interface LocalizedRoute {
	slug: string;
}

export const ROUTER_CONFIG = new InjectionToken<RouterConfig>('routerConfigToken');

/**
* @internal
*/
export const _ROUTER_CONFIG = new InjectionToken('_routerConfigToken');
