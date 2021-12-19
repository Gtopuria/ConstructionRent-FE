import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DocumentRef {
	constructor(@Inject(DOCUMENT) private document: any) { }

	get native(): Document {
		return this.document;
	}
}
