<template>
  <div>
    <button @click="triggerComposable">using composable</button>

    <button @click="triggerInComposable">in composable</button>
  </div>
</template>

<script setup lang="ts">
const triggerComposable = () => useBugsnag().notify("using composable");

const triggerInComposable = () => useComp();
</script>
