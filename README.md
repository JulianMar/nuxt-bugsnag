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
    'nuxt-bugsnag'
  ]
}
```

You can pass every bugsnag [options](https://docs.bugsnag.com/platforms/javascript/configuration-options/) in the config object


```js
{
  bugsnag: {
    config: {
      apiKey: 'your key',
      enabledReleaseStages: ['staging', 'production'],
    }
  }
}
```


# Source Maps

You can upload sourcemaps by adding the option `publishRelease`.

```js
{
  bugsnag: {
    config: {
      publishRelease: true,
    }
  }
}
```

I would recommend to set these options
```js
{
  modules: [
    'nuxt-bugsnag',
  ],

  bugsnag: {
    publishRelease: true,
    config: {
      apiKey: 'YOUR_API_KEY',
      enabledReleaseStages: ['staging', 'production'],
      releaseStage: process.env.NODE_ENV
      appVersion: 'YOUR_VERSION',
    }
  }
}
```

# Reporting custom errors
The simplest answer is like this.
```
this.$bugsnag.notify(new Error('Some Error'))
```

if you like the composition approach you can do it like this
```
useBugsnag().notify('Some Error')
```

## Development

1. Clone this repository
2. Install dependencies using `npm install`
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
