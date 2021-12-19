import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBoostrapComponent } from './app-boostrap/app-boostrap.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { FEAUTRE_ROUTES } from './core/route/route.const';
import { EquipmentComponent } from './equipment/equipment.component';
import { OrderCartComponent } from './order-cart/order-cart.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: AppBoostrapComponent },
			{ path: FEAUTRE_ROUTES.equipment, component: EquipmentComponent },
			{ path: FEAUTRE_ROUTES.cart, component: OrderCartComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
