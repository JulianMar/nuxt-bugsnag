export default function (ctx, inject) {
  inject('bugsnag', process.bugsnag || {})
}
