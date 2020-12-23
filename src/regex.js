const number = '((?:[\\d]+)|(?:[\\d]*\\.[\\d]+))';
const percentage = '((?:[\\d]+%)|(?:[\\d]*\\.[\\d]+%))';

module.exports = {
	hex: new RegExp(
		`^#?(${[3, 6, 4, 8].map((length) => `[0-9a-f]{${length}}`).join('|')})$`
	),
	rgb: new RegExp(`^rgba?\\(${number},${number},${number}(?:,${number})?\\)$`),
	...Object.fromEntries(
		['hsl', 'hsb', 'hsv', 'hwb'].map((model) => [
			model,
			new RegExp(
				`^${model}a?\\(${number},${percentage},${percentage}(?:,${number})?\\)$`
			),
		])
	),
};
