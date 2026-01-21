<script setup lang="ts">
const start = () => {
  initBugsnag()
}
</script>

<template>
  <div>
    <h2>Defer Bugsnag Start Example</h2>
    <p>
      Click the button below to initialize Bugsnag (if consent has been given).
    </p>
    <button @click="start">
      Initialize Bugsnag
    </button>
  </div>
</template>
