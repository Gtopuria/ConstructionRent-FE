import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreSdkModule } from './store-sdk/store-sdk.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { EquipmentComponent } from './equipment/equipment.component';
import { AppBoostrapComponent } from './app-boostrap/app-boostrap.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
	declarations: [
		AppComponent,
		EquipmentComponent,
		AppBoostrapComponent,
		OrderCartComponent,
		MainLayoutComponent,
		OrdersComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreSdkModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
