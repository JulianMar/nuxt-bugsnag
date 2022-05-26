<template>
  <div>
    <h1>Nuxt.js example</h1>
    <p>
      This is an example of how to include <code>@bugsnag/js</code>,
      <code>@bugsnag/plugin-vue</code> and
      <code>@bugsnag/plugin-express</code> for universal error reporting in a
      Nuxt.js app.
    </p>
    <BadButtons />
    <BadButtonsComp />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h3 {
  margin-top: 30px;
}
</style>
