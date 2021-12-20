import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FEATURE_ROUTES } from '../core/route/route.const';

@Component({
	selector: 'app-app-boostrap',
	templateUrl: './app-boostrap.component.html',
	styleUrls: ['./app-boostrap.component.scss']
})
export class AppBoostrapComponent implements OnInit {

	constructor(private router: Router) {
	}
	ngOnInit() {
		// Additional boostrap logic goes here
		// Redirecting to default route
		this.router.navigate([FEATURE_ROUTES.equipment])
	}

}
