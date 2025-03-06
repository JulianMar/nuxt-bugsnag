# nuxt-bugsnag

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

>

[📖 **Release Notes**](./CHANGELOG.md)

## Playground

Open Stackblitz and [try it out](https://stackblitz.com/edit/nuxt-starter-s5gmvk?file=nuxt.config.ts).

## Setup

1. Add `nuxt-bugsnag` dependency to your project

```bash
npx nuxi@latest module add bugsnag
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
    disableLog: true,
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

## Performance

Only available in 7.4.0 and above

The simplest Configuration for the [bugsnag performance](https://docs.bugsnag.com/performance/integration-guides/web/) feature is like this
```js
{
  bugsnag: {
    apiKey: 'YOUR API KEY',
    performance: true
  }
}
```

for custom options you can use the following config and get all the settings from [here](https://docs.bugsnag.com/performance/integration-guides/web/configuration-options/)

```js
{
  bugsnag: {
    apiKey
    config: {
      performanceConfig: {
        autoInstrumentFullPageLoads: true,
      }
    }
  }
}
```

### Custom Performance Monitoring
For sending Custom Spans see [this](https://docs.bugsnag.com/performance/integration-guides/web/#sending-custom-spans) documentation.
There is a little helper in the module to send custom spans.

> This can only be used on the client side and should never be called on the server side. There is a mock included so you don't need to worry about that, but should be kept in mind.

```js
useBugsnagPerformance().startSpan('my-span')
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
