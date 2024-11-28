<template>
  <div />
</template>

<script setup>
const fakeAsyncCall = async () => {
  try {
    // throw new Error('test')
    await new Promise((resolve, reject) => setTimeout(reject('test'), 1000))
  }
  catch (e) {
    useBugsnag().notify(e)
  }
}

await fakeAsyncCall()
</script>
