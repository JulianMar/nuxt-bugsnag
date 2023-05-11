export default defineEventHandler(() => {
  const test = new Error('error from server')
  useBugsnag().notify(test)

  throw test
})
