export default function (ctx, inject) {
  // Inject Sentry to the context as $sentry
  inject('bugsnag', process.bugsnag || {})
}
