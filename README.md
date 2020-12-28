# color-parse

Parse CSS color strings, with added support for other color models not included in the CSS specification.

# Usage

```
npm install @colorsuite/color-parse
```
```javascript
const { parseColor } = require('./@colorsuite/color-parse');

parseColor('#fabfab') // { model: 'hex', color: { r: 250, g: 191, b: 171, a: 1 } }
parseColor('#fabfab') // { model: 'hex', color: { r: 250, g: 191, b: 171, a: 1 } }
```

# Specification and compatibility

CSS only officially supports hexes, `rbg` and `hsl`. This library will also identify `hsv`, `hsb` (an alias of `hsv`) and `hwb` colors.