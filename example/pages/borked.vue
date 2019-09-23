<template>
  <div />
</template>

<script>
export default {
  name: 'Borked',
  components: {},
  props: {},
  asyncData: () => {
    throw new Error('borked')
  }
}
</script>
