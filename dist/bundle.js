const number = '((?:[\\d]+)|(?:[\\d]*\\.[\\d]+))';
const percentage = '((?:[\\d]+%)|(?:[\\d]*\\.[\\d]+%))';

var regex = {
  hex: new RegExp(
    `^#?(${[3, 6, 4, 8].map((length) => `[0-9a-f]{${length}}`).join('|')})$`
  ),
  rgb: new RegExp(
    `^rgba?\\(${number},${number},${number}(?:,${number})?\\)$`
  ),
  ...Object.fromEntries(
    ['hsl', 'hsb', 'hsv', 'hwb'].map((model) => [
      model,
      new RegExp(
        `^${model}a?\\(${number},${percentage},${percentage}(?:,${number})?\\)$`
      ),
    ])
  ),
};

var colorModels = [
	{
		space: 'rgb',
		pattern: regex.hex,
		transform(hex) {
			const values = [3, 4].includes(hex.length)
				? hex.split('').map((value) => value.repeat(2))
				: hex.match(/.{2}/g);
			const [r, g, b, a] = (values.length === 4 ? values : [...values, 'ff'])
			.map((value) => parseInt(value, 16));
			return [r, g, b, a/255];
		},
	},
	...['rgb', 'hsl', 'hsv', 'hsb', 'hwb'].map((space) => ({
		space,
		pattern: regex[space],
		transform(p1, p2, p3, alpha = '1') {
			return [p1, p2, p3, alpha].map(value => parseFloat(value));
		}
	})),
];

function parseColor(color) {
	if (typeof color !== 'string') {
		throw new TypeError(
			`${Object.prototype.toString.call(color)} is not a string`
		);
	}
	color = color.toLowerCase().replace(/\s/g, '');
	for (const model of colorModels) {
		const match = color.match(model.pattern);
		if (match !== null) {
			const { space } = model;
			const color = model.transform(...match.slice(1, match.length));
			return [color, space]
		}
	}
	return [undefined, undefined];
}

export { parseColor };
