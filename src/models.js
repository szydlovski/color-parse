import regex from './regex';
export default [
	{
		name: 'hex',
		pattern: regex.hex,
		transform: (hex) => {
			const values = [3, 4].includes(hex.length)
				? hex.split('').map((value) => value.repeat(2))
				: hex.match(/.{2}/g);
			return Object.fromEntries(
				(values.length === 4 ? values : [...values, 'ff'])
					.map((value) => parseInt(value, 16))
					.map((value, index) => [
						'rgba'[index],
						index !== 3 ? value : value / 255,
					])
			);
		},
	},
	...['rgb', 'hsl', 'hsv', 'hsb', 'hwb'].map((mode) => ({
		name: mode,
		pattern: regex[mode],
		transform: (p1, p2, p3, alpha = '1') =>
			Object.fromEntries(
				[p1, p2, p3, alpha].map((value, index) => [
					`${mode}a`[index],
					parseFloat(value),
				])
			),
	})),
];