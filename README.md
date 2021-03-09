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
    ['nuxt-bugsnag', {
      apiKey: 'YOUR_API_KEY',
      publishRelease: true,
    }]
  ]
}
```

# BugsnagBuildReporterPlugin

You can upload your source control infos to bugsnag this enpowers you to have `releases`.
These are all the options from the plugin:
  - `appVersion: string` the version of the application you are building
  - `releaseStage: string` `'production'`, `'staging'` etc. (leave blank if this build can be released to different `releaseStage`s)
  - `sourceControl: object` an object describing the source control of the build (if not specified, the module will attempt to detect source control information from `.git`, `.hg` and the nearest `package.json`)
    - `provider: string` can be one of: `'github'`, `'github-enterprise'`, `'gitlab'`, `'gitlab-onpremise'`, `'bitbucket'`, `'bitbucket-server'`
    - `repository: string` a URL (`git`/`ssh`/`https`) pointing to the repository, or webpage representing the repository
    - `revision: string` the unique identifier for the commit (e.g. git SHA)
  - `builderName: string` the name of the person/machine that created this build (defaults to the result of the `whoami` command)
  - `autoAssignRelease: boolean` automatically associate this build with any new error events and sessions that are received for the `releaseStage` until a subsequent build notification is received. If this is set to `true` and no `releaseStage` is provided the build will be applied to `'production'`.

You can set these options by setting the `reporterOptions` like this:

```js
{
  modules: [
    // Simple usage
    'nuxt-bugsnag',

    // With options
    ['nuxt-bugsnag', {
      apiKey: 'YOUR_API_KEY',
      reporterOptions: {
        appVersion: 'v1.0.0',
        autoAssignRelease: true
      },
      publishRelease: true,
    }]
  ]
}
```

I would recommend to set these options
```js
{
  modules: [
    // Simple usage
    'nuxt-bugsnag',

    // With options
    ['nuxt-bugsnag', {
      apiKey: 'YOUR_API_KEY',
      reporterOptions: {
        releaseStage: process.env.NODE_ENV
        autoAssignRelease: true
      },
      publishRelease: true,
    }]
  ]
}
```

# Reporting custom errors
The simplest answer is like this.
```
this.$bugsnag.notify(new Error('Some Error'))
```

This answer holds up for components and store.
There are some places where it doesn't work like that, because this is not bound to the app.

In Nuxt if you don't have this you will have context and there is `$bugsnag` under `app` so in code form:

plugins/exampleLog.js
```
export default (context) => {
  context.app.$bugsnag.notify(new Error('some Error')
}
```

For more info check out this repo https://github.com/bugsnag/webpack-bugsnag-plugins

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
