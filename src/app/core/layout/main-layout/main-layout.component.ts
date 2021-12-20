import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { OrderState } from 'src/app/store-sdk/order/order.model';
import { selectCartItemsCount } from '../../../store-sdk/order/order.selector';
import { ignoreNil } from 'src/app/store-sdk/utils/ngrx-util';
import { FEATURE_ROUTES } from '../../route/route.const';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main-panel-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

	mobileQuery: MediaQueryList;
	cartItemCount = 0;
	cartItemCount$$ = this.store.pipe(
		select(selectCartItemsCount),
		ignoreNil(),
		tap(count => {
			this.cartItemCount = count;
		})
	).subscribe();
	private _mobileQueryListener: () => void;

	constructor(
		private store: Store<OrderState>,
		private router: Router,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		@Inject(DOCUMENT) public document: Document
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
		if(this.cartItemCount$$) {
			this.cartItemCount$$.unsubscribe();
		}
	}

	redirectToCart() {
		this.router.navigate([FEATURE_ROUTES.cart])
	}

	ngOnInit(): void {
	}

}
