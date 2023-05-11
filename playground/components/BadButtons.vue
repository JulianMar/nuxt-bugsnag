<template>
  <div id="buttons">
    <h3>Send some errors by clicking below:</h3>
    <button @click="sendHandled">Send handled</button>
    <button @click="sendUnhandled">Send unhandled</button>
    <button @click="toggleOk">Trigger a render error</button>
    <button @click="triggerNextTickError">
      Throw an error during Vue.nextTick()
    </button>
    <button @click="triggerWatchError">Trigger a handled watch error</button>
    <button @click="triggerErrorOnServer">Trigger a error in server dir</button>
    <a class="button" href="borked">Send an error from the server</a>
    <span v-if="!ok">{{ list[10].text }}</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    ok: true,
    list: [],
    doAWatchError: false
  }),
  watch: {
    doAWatchError(val) {
      if (val) {
        throw new Error('Bad thing!')
      }
    }
  },
  methods: {
    // Tell the bugsnagClient about an error that was handled
    sendHandled() {
      try {
        throw new Error('Catch me if you can')
      } catch (e) {
        this.$bugsnag.notify(e)
      }
    },
    // Throws an error outside in a timer which will be reported by the bugsnagClient
    sendUnhandled() {
      setTimeout(() => {
        throw new Error('Crashy')
      })
    },
    // Sets the data in such a way that the next render of the component will throw an error
    toggleOk() {
      this.ok = !this.ok
    },
    // Throws an error using Vue.js's nextTick() function
    triggerNextTickError() {
      this.$nextTick(function () {
        JSON.parse('definitely not json')
      })
    },
    // Changes the value being watched such that it throws an error
    triggerWatchError() {
      this.doAWatchError = true
      setTimeout(
        function () {
          this.doAWatchError = false
        }.bind(this),
        100
      )
    },
    triggerErrorOnServer() {
      $fetch('api/error')
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
  }
}
</script>
