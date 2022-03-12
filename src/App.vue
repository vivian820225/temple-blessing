<template>
  <div id="app">
    <div class="app-container">
      <router-view class="flex-auto" />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: { Footer },
  methods: {}
}
</script>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
