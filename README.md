# `react-inline-svg`: Inline SVG wrapper component for React

## Usage

You can use [`svg-inline-loader`](https://github.com/sairion/svg-inline-loader) with [Webpack](https://webpack.github.io) to inline SVG.

```jsx
import { InlineSVG } from '@team-griffin/react-inline-svg';

// Use with loader
import svg from '!svg-inline-loader!icon.svg';
<InlineSVG src={svg} />

// Use without loader
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="48" height="48" viewBox="0 0 48 48">
  <g id="artboard-1">
    <path d="m-115.8,119.6c-12.8-22-3.2,33.6-3.2,33.6,8.8,34.4,145.6-17.6,145.6-17.6s168.8-30.4,180-34.4,96.8,1.6,96.8,1.6l-4.8-22.4c-64.8-46.4-75.2-16.8-88.8-20.8s-11.2,5.6-14.4,6.4-42.4-24-48.8-23.2-31.62-23.007-16.8,8.8c22.23,47.707-60.759,37.627-75.2,28-16.8-11.2,7.2,18.4,7.2,18.4,18.4,20-16,3.2-16,3.2-34.4-12.8-58.4,12.8-61.6,13.6s-8,4-8.8-2.4-6.865-21.256-40,3.2c-33.6,24.8-44,8.8-44,8.8l-7.2-4.8z" class="cls-1"/>
  </g>
</svg>`;
<InlineSVG src={svgSource} />
```

## API

### InlineSVG

There is an added feature which allows you to template your svg. You can pass in any additional props and they will be templated. It uses lodash's template function, with the variable set to `d`.

For example:
```jsx

// Let's say this is your svg source file
<svg>
  <path foo="${d.myExtraProp}"/>
</svg>

// Usage
<InlineSVG myExtraProp="hello"/>

// Output
<svg>
  <path foo="hello"/>
</svg>
```

#### prop `src` : string

valid SVG element string.

#### prop `element` : string

You can change element where svg included using `element` prop, default is `<i />`. But self closed tags like `img` is not allowed, and an error will be thrown from React side.

#### prop `raw` : bool (experimental!)

This prop allows your svg file to be rendered directly, without a container element wraps it. This is an experimental feature. Also, the prop will be ignored on server side rendering environment.

### AsyncInlineSVG

This component is a utility component that asynchronously loads in the src of an svg. This allows for inlining of a remote svg.

```jsx
import { AsyncInlineSVG } from '@team-griffin/react-inline-svg';

<AsyncInlineSVG src="/my/remote/file.svg"/>
```