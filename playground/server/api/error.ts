export default defineEventHandler((event) => {
  // console.log(event)
  const test = new Error('error from server')
  useBugsnag().notify(test)

  throw test
})
