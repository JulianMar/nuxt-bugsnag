<template>
    <div>Some Page</div>
    <NuxtLink to="/">Go to index page</NuxtLink>
</template>

<script setup lang="ts">
import { useBugsnagPerformance } from '../../src/runtime/client/composables/useBugsnag';

const span = useBugsnagPerformance().startNetworkSpan(
    { method: 'GET', url: 'https://example.com/api' })

span.end({ status: 200 })
</script>