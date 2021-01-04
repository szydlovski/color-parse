import regex from './regex.js';
export default [
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
