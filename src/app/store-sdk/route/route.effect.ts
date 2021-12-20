import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	NavigationCancel,
	NavigationEnd,
	NavigationStart,
	ResolveEnd,
	Router,
	RoutesRecognized
} from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import {
	catchError,
	filter,
	map,
	mapTo,
	switchMap,
	tap,
	withLatestFrom
} from 'rxjs/operators';
import { getQueryParams } from '../utils/path.util';
import { getPathName } from '../utils/route-util';

import { ActionWithPayload } from '../utils/store-utils';

import { RouteAction, ROUTE_ACTION_TYPE } from './route.action';
import {
	NavigatePayload,
	NavigationDirection,
	Route,
	SetQueryParamsPayload
} from './route.model';
import { RouteSelector } from './route.selector';
import { RouteService } from './route.service';
import { RouterState } from './state';

@Injectable()
export class RouteEffect {
	@Effect() navigate$: Observable<Action> = this.actions$.pipe(
		ofType(ROUTE_ACTION_TYPE.navigate),
		map((action: ActionWithPayload<NavigatePayload>) => action.payload),
		switchMap(payload =>
			this.runNavigation(this.routeService.navigate(payload))
		)
	);

	@Effect() navigationCancel$: Observable<Action> = this.router.events.pipe(
		filter(event => event instanceof NavigationCancel),
		mapTo(this.routeAction.navigationCancel())
	);

	// @Effect({ dispatch: false}) replacePath$: Observable<string> = this.actions$.pipe(
	// 	ofType(ROUTE_ACTION_TYPE.replacePath),
	// 	map((action: ActionWithPayload<string>) => action.payload),
	// 	tap(payload => this.routeService.replacePath(payload))
	// );

	@Effect() navigationStart$: Observable<Action> = this.router.events.pipe(
		filter(event => event instanceof NavigationStart),
		mapTo(this.routeAction.navigationStart())
	);

	@Effect() setQueryParams$: Observable<Action> = this.actions$.pipe(
		ofType(
			ROUTE_ACTION_TYPE.setQueryParams,
			ROUTE_ACTION_TYPE.updateQueryParams
		),
		map((action: ActionWithPayload<SetQueryParamsPayload>) => ({
			payload: action.payload,
			shouldMerge: action.type === ROUTE_ACTION_TYPE.updateQueryParams
		})),
		withLatestFrom(
			this.store.pipe(select(this.routeSelector.getCurrent()))
		),
		filter(([, current]) => !!current),
		switchMap(([{ payload, shouldMerge }, current]) =>
			this.runNavigation(
				this.routeService
					.navigate({
						routeName: current!.name,
						params: current!.params,
						extras: {
							replaceUrl: payload.replaceUrl,
							fragment: current!.fragment,
							queryParams: shouldMerge
								? {
									...current!.queryParams,
									...payload.queryParams
								}
								: payload.queryParams
						}
					})
					.then(navigationResult => {
						// if navigation was successful and URL was not replaced, history entry was made
						if (navigationResult && !payload.replaceUrl) {
							this.hasHistory = true;
						}
						return navigationResult;
					})
			)
		)
	);

	@Effect() navigationEnd$: Observable<Action> = this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		withLatestFrom(
			this.store.pipe(select(this.routeSelector.getCurrent()))
		),
		map(([event, currentRoute]: [NavigationEnd, Route | undefined]) => {
			const externalUrl = this.location.prepareExternalUrl(event.url);
			if (currentRoute && externalUrl !== currentRoute.externalUrl) {
				const newQueryParams = getQueryParams(externalUrl);
				if (!_.isEqual(currentRoute.queryParams, newQueryParams)) {
					this.store.dispatch(
						this.routeAction.setQueryParamsSuccess(newQueryParams)
					);
					this.store.dispatch(this.routeAction.navigationEnd());
				}
			}

			return this.routeAction.navigationEnd();
		})
	);

	@Effect() resolveEnd$: Observable<Action> = this.router.events.pipe(
		filter(event => event instanceof ResolveEnd),
		map((event: ResolveEnd) => this.getActivatedRouteSnapshot(event)),
		filter(snaphot => !!snaphot),
		map(activatedRouteSnapshot => {
			const snapshot = activatedRouteSnapshot!;
			const externalUrl = this.routeService.generateUrlFromSnapshot(
				snapshot
			);
			return this.routeAction.resolveEnd({
				current: {
					name: snapshot.routeConfig.path,
					externalUrl,
					pathName: getPathName(externalUrl),
					params: snapshot.params,
					queryParams: snapshot.queryParams,
					fragment: snapshot.fragment || undefined,
					data: snapshot.data
				},
				hasHistory: this.hasHistory,
				lastNavigationDirection: this.navigationDirection
			});
		})
	);

	private hasHistory = false;
	private navigationDirection = NavigationDirection.Forward;

	constructor(
		private store: Store<RouterState>,
		private actions$: Actions,
		private routeAction: RouteAction,
		private routeService: RouteService,
		private routeSelector: RouteSelector,
		private router: Router,
		private location: Location
	) { }

	private runNavigation(
		navigationPromise: Promise<boolean>
	): Observable<Action> {
		return from(navigationPromise).pipe(
			filter(value => !value),
			mapTo(this.routeAction.navigationCancel()),
			catchError(() => of(this.routeAction.navigationCancel()))
		);
	}

	private getActivatedRouteSnapshot(
		event: RoutesRecognized | ResolveEnd
	): ActivatedRouteSnapshot | null {
		let snapshot = event.state.root.firstChild;

		while (snapshot && snapshot.firstChild) {
			snapshot = snapshot.firstChild;
		}

		return snapshot;
	}
}
