(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['color-parse'] = {}));
}(this, (function (exports) { 'use strict';

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
  			return {
  				model: model.name,
  				color: model.transform(...match.slice(1, match.length)),
  			};
  		}
  	}
  }

  exports.parseColor = parseColor;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
