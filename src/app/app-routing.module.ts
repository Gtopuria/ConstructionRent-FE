import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBoostrapComponent } from './app-boostrap/app-boostrap.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { FEAUTRE_ROUTES } from './core/route/route.const';
import { EquipmentComponent } from './equipment/equipment.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: AppBoostrapComponent },
			{ path: FEAUTRE_ROUTES.equipment, component: EquipmentComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
