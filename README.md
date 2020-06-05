# nuxt-bugsnag

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![CircleCI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

>

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-bugsnag` dependency to your project

```bash
npm install nuxt-bugsnag
```

2. Add `nuxt-bugsnag` to the `modules` section of `nuxt.config.js`.


```js
{
  modules: [
    ['nuxt-bugsnag', {
      apiKey: 'Your_API_KEY'
    }]
  ]
}
```

If you need more flexibility and want to have more options you can try this approach

```js
{
  modules: [
    // With options
    ['nuxt-bugsnag', {
      config: {
        apiKey: 'YOUR_BROWSER_API_KEY'
      },
    }]
  ]
}
```

You can pass every bugsnag [options](https://docs.bugsnag.com/platforms/javascript/configuration-options/) in the config object


```js
{
  modules: [
    // Simple usage
    'nuxt-bugsnag',

    // With options
    ['nuxt-bugsnag', {
      config: {
        enabledReleaseStages: ['staging', 'production'],
      }
    }]
  ]
}
```


# Source Maps

You can upload sourcemaps by adding the option `publishRelease`.

```js
{
  modules: [
    // Simple usage
    'nuxt-bugsnag',

    // With options
    ['nuxt-bugsnag', {
      apiKey: 'YOUR_API_KEY',
      publishRelease: true,
    }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Julian Martin <julian.martin@russmedia.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-bugsnag/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-bugsnag

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-bugsnag.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-bugsnag

[circle-ci-src]: https://circleci.com/gh/JulianMar/nuxt-bugsnag/tree/master.svg?style=shield
[circle-ci-href]: https://circleci.com/gh/julianmar/nuxt-bugsnag

[codecov-src]: https://img.shields.io/codecov/c/github/julianmar/nuxt-bugsnag.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/julianmar/nuxt-bugsnag

[license-src]: https://img.shields.io/npm/l/nuxt-bugsnag.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-bugsnag
