# nuxt-bugsnag

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

>

[📖 **Release Notes**](./CHANGELOG.md)

## Nuxt2

If you are using Nuxt2 see [here](https://github.com/JulianMar/nuxt-bugsnag/tree/v4.2.2)

## Playground

Open Stackblitz and [try it out](https://stackblitz.com/edit/nuxt-starter-s5gmvk?file=nuxt.config.ts).


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


### Source Maps

You can upload sourcemaps by adding the option `publishRelease`.
It's important to set the baseUrl as well, it will allow bugsnag to map your errors to the sourcemap:

```js
{
  bugsnag: {
    publishRelease: true,
    baseUrl: 'http://localhost:3000'
  }
}
```

The output for a medium Nuxt App can get quite big. So we added an option to disable the logs for that case.
```js
{
  bugsnag: {
    publishRelease: true,
    disableLogs: true,
    baseUrl: 'http://localhost:3000'
  }
}
```


### Setting a different project root

If your Nuxt App runs in a different folder than `/`, you might want to set `projectRoot` to this directory, so that BugSnag can match the sourcemap.

```js
{
  bugsnag: {
    publishRelease: true,
    projectRoot: '/someFolder/'
  }
}
```

## Config Example

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
      releaseStage: process.env.NODE_ENV,
      appVersion: 'YOUR_VERSION',
    }
  }
}
```

## Reporting custom errors

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

[codecov-src]: https://img.shields.io/codecov/c/github/julianmar/nuxt-bugsnag.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/julianmar/nuxt-bugsnag

[license-src]: https://img.shields.io/npm/l/nuxt-bugsnag.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-bugsnag
