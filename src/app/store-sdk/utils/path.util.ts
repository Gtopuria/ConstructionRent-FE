import { DefaultUrlSerializer } from '@angular/router';
import * as _ from 'lodash';

import { Dictionary } from './store-utils';

const serializer = new DefaultUrlSerializer();

/**
 * Replaces the current fragment with the new fragment.
 * @example
 * // returns "/en/home#header"
 * replaceFragment("/en/home#footer", "header");
 */
export function replaceFragment(
	url: string | undefined,
	fragment: string | undefined
): string {
	const urlWithoutFragment = (url && url.split('#')[0]) || '';
	const normalizedFragment = normalizeFragment(fragment);
	return normalizedFragment
		? `${urlWithoutFragment}#${normalizedFragment}`
		: urlWithoutFragment;
}

/**
 * Returns the fragment from the path.
 * @example
 * // returns "footer"
 * getFragment("/en/home#footer");
 * * @example
 * // returns undefined
 * getFragment("/en/home");
 */
export function getFragment(url: string | undefined): string | undefined {
	if (!url) {
		return undefined;
	}

	return url.split('#')[1];
}

/**
 * Returns the fragment without hash.
 * @example
 * // returns "footer"
 * getFragmentWithoutHash("terms-and-conditions#footer");
 * @example
 * // returns "footer"
 * getFragmentWithoutHash("#footer");
 * @example
 * // returns "terms-and-conditions"
 * getFragmentWithoutHash("terms-and-conditions");
 * @example
 * // returns ""
 * getFragmentWithoutHash("terms-and-conditions", true);
 */
export function normalizeFragment(
	fragment: string | undefined | null,
	isFullUrl = false
): string {
	if (!fragment) {
		return '';
	}

	const index = fragment.indexOf('#');
	if (index === -1 && isFullUrl) {
		return '';
	}

	return fragment.substr(index + 1);
}

/**
 * Returns the path without fragment and query string (same as native `location.pathname`)
 */
export function getPathName(path: string): string {
	return _.replace(path, /(\?|#)(.*)$/, '');
}

/**
 * Returns the path with the new query params
 */
export function replaceQueryParams(path: string, queryParams: Dictionary<any>) {
	const tree = serializer.parse(path);
	tree.queryParams = queryParams;
	return serializer.serialize(tree);
}

/**
 * Returns the parsed query params from the path
 */
export function getQueryParams(path: string): Dictionary<any> {
	return serializer.parse(_.replace(path, /(.*)(\?)/, '?')).queryParams;
}
