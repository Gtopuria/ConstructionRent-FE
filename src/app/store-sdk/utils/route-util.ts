import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Dictionary, replace } from 'lodash';
import { RouteConfig } from '../route/route.config';

export function getAllParents(
	route: RouteConfig,
	routeLookup: Dictionary<RouteConfig>
): RouteConfig[] {
	const parents: RouteConfig[] = [];
	const parentName: string | undefined = route.parent;

	if (parentName) {
		const parentRoute: RouteConfig | undefined = routeLookup[parentName];
		if (!parentRoute) {
			throw new Error(
				`Parent '${parentName}' not found for route key '${route.name}'`
			);
		}
		parents.unshift(
			...getAllParents(parentRoute, routeLookup),
			parentRoute
		);
	}

	return parents;
}

export function getActivatedRouteSnapshot(
	snapshot: RouterStateSnapshot
): ActivatedRouteSnapshot | null {
	let activated = snapshot.root.firstChild;

	while (activated && activated.firstChild) {
		activated = activated.firstChild;
	}

	return activated;
}

export function getPathName(path: string): string {
	return replace(path, /(\?|#)(.*)$/, '');
}
