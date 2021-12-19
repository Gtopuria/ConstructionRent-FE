import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

export const ignoreNil = () => <T>(source: Observable<T>) =>
	source.pipe(
		filter(
			(input): input is NonNullable<T> =>
				input !== undefined && input !== null
		)
	);
