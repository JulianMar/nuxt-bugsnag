<template>
  <div>
    <h1>GDPR Consent Example</h1>
    <p>This page demonstrates deferred Bugsnag initialization.</p>

    <div v-if="!hasConsent">
      <p>Bugsnag is not initialized. Errors are logged to console only.</p>
      <button @click="giveConsent">
        Accept Cookies / Give Consent
      </button>
    </div>

    <div v-else>
      <p>Consent given. Bugsnag is now active.</p>
    </div>

    <button @click="testError">
      Test Error
    </button>
    <NuxtLink to="/">
      Back to Home
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const hasConsent = ref(false)

function giveConsent() {
  hasConsent.value = true
  initBugsnag()
}

function testError() {
  useBugsnag().notify(new Error('Test error from consent page'))
}
</script>
