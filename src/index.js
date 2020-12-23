const colorFormats = require('./formats');

function parseColor(color) {
	if (typeof color !== 'string') {
		throw new TypeError(
			`${Object.prototype.toString.call(color)} is not a string`
		);
	}
	color = color.toLowerCase().replace(/\s/g, '');
	for (const format of colorFormats) {
		const match = color.match(format.pattern);
		if (match !== null) {
			return {
				model: format.name,
				color: format.transform(...match.slice(1, match.length)),
			};
		}
	}
}

module.exports = { parseColor };
