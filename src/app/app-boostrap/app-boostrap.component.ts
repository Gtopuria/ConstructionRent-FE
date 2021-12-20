import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FEATURE_ROUTES } from '../core/route/route.const';
import { RouteAction } from '../store-sdk/route/route.action';
import { RouteState } from '../store-sdk/route/route.model';

@Component({
	selector: 'app-app-boostrap',
	templateUrl: './app-boostrap.component.html',
	styleUrls: ['./app-boostrap.component.scss']
})
export class AppBoostrapComponent implements OnInit {

	constructor(private store: Store<RouteState>,
		private routeAction: RouteAction) {
	}
	ngOnInit() {
		// Additional boostrap logic goes here
		// Redirecting to default route
		this.store.dispatch(this.routeAction.navigate(FEATURE_ROUTES.equipment));
	}

}
