# color-parse

Parse CSS color strings, with added support for other color models not included in the CSS specification.

# Usage

```
npm install @szydlovski/color-parse
```
```javascript
import { parseColor } from '@szydlovski/color-parse';

parseColor('#fabfab66') // [ [ 250, 191, 171, 0.4 ], 'rgb' ]
parseColor('hsl(270,20%,50%)') // [ [ 270, 20, 50, 1 ], 'hsl' ]

// # in hexes is optional
parseColor('fff') // [ [ 255, 255, 255, 1 ], 'rgb' ]

// whitespace is ignored
parseColor('# a 5 a 5 a 5') // [ [ 165, 165, 165, 1 ], 'rgb' ]

// rgb/rgba and hsl/hsla are treated as aliases
parseColor('rgba(120,70,70,0.45)') // [ [ 120, 70, 70, 0.45 ], 'rgb' ]
parseColor('rgb(120,70,70,0.45)') // [ [ 120, 70, 70, 0.45 ], 'rgb' ]

// if the color is not valid
parseColor('not a valid color') // [undefined, undefined]

// also available as cjs
const { parseColor } = require('@szydlovski/color-parse/cjs');
```

# API

## parseColor(colorString)

Arguments:
- colorString - `string` - the string to parse for colors

Returns:
- [colorArray, colorSpace] - `array` - a tuple containing
  - colorArray - `array` - containing parsed color values, i.e. `[255,255,255]`
  - colorSpace - `string` - denoting the parsed color space, i.e. `rgb`

Throws:
- `TypeError` - if the first argument is not a `string`

# Specification and compatibility

- Parsing of hex strings with alpha values (i.e. `#ffffff00` or `#fff0`) is supported, and `#` in hexes is optional
- CSS only officially supports hexes, `rbg` and `hsl`. This library will also identify `hsv`, `hsb` (an alias of `hsv`) and `hwb` colors.
- CSS treats `rgb` as an alias for `rgba` and vice versa (the same goes for `hsl` and `hsla`), which is why this library will also parse alpha values from `rgb` and `hsl`, and add a default alpha of `1` if it's not present.
- Parsed values are not validated or clamped to any value range.
