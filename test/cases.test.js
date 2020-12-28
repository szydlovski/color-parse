const hex = [
	['ffffff', [255, 255, 255, 1]],
	['ffffff00', [255, 255, 255, 0]],
	['fff', [255, 255, 255, 1]],
	['fff0', [255, 255, 255, 0]],
	['49eb34', [73, 235, 52, 1]],
	['49eb3400', [73, 235, 52, 0]],
	['49eb34ff', [73, 235, 52, 1]],
];

const rgb = [
	['0,0,0', [0, 0, 0, 1]],
	['255,255,255', [255, 255, 255, 1]],
	['255,255,255', [255, 255, 255, 1]],
	['125,12,83,.1', [125, 12, 83, 0.1]],
	['255,255,255', [255, 255, 255, 1]],
	['255,25 5,255,.8', [255, 255, 255, 0.8]],
];

const hue = [
	['320,50%,15%', [320, 50, 15, 1]],
	['630,43%,89%', [630, 43, 89, 1]],
	['630,43%,89%,1', [630, 43, 89, 1]],
	['630,43%,89%,0', [630, 43, 89, 0]],
	['630,43%,89%,0.5', [630, 43, 89, 0.5]],
];

const invalid = [
	'#04045',
	'#040450a',
	'#040450a1c',
	'##040450a1c',
	'#040450a1g',
	'rgb255,255,255',
	'rgb(255,255,255',
	'rgb255,255,255)',
	'hsl(360,50,50)',
	'hsx(360,50,50)',
];

export default [
	...hex.flatMap(([hexString, [r, g, b, a]]) =>
		['', '#'].map((prefix) => ({
			input: prefix + hexString,
			value: {
				model: 'hex',
				color: { r, g, b, a },
			}
		}))
	),
	...rgb.flatMap(([parameters, [r, g, b, a]]) =>
		['rgb', 'rgba'].map((format) => ({
			input: `${format}(${parameters})`,
			value: {
				model: 'rgb',
				color: { r, g, b, a },
			}
		}))
	),
	...hue.flatMap(([parameters, values]) =>
		['hsl', 'hsv', 'hsb', 'hwb'].flatMap((mode) =>
			['', 'a'].map((alpha) => ({
				input: `${mode + alpha}(${parameters})`,
				value: {
					model: mode,
					color: Object.fromEntries(
						[...(mode + 'a')].map((param, index) => [param, values[index]])
					),
				}
			}))
		)
	),
	...invalid.map((invalidString) => ({ input: invalidString, value: {} })),
];
