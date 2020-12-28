import colorModels from './models';


export function parseColor(color) {
	if (typeof color !== 'string') {
		throw new TypeError(
			`${Object.prototype.toString.call(color)} is not a string`
		);
	}
	color = color.toLowerCase().replace(/\s/g, '');
	for (const model of colorModels) {
		const match = color.match(model.pattern);
		if (match !== null) {
			return {
				model: model.name,
				color: model.transform(...match.slice(1, match.length)),
			};
		}
	}
}