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

@NgModule({
	declarations: [
		AppComponent,
		EquipmentComponent,
		MainLayoutComponent,
		AppBoostrapComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreSdkModule,
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
