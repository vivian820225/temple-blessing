<template>
  <div class="home-layer h-full flex flex-col justify-center items-center">
    <img class="logo" src="@/assets/images/logo.png" alt="楊梅玉玄宮" />
    <hr class="deco-line bg-secondary mt-5 mb-6 mx-auto" />
    <p class="sub-title text-xl text-center text-primary font-bold leading-10">
      來自元宇宙的神祕宮廟<br />
      絕世無雙的保護力，強大的祝福能量
    </p>
    <router-link class="btn-primary btn-xl mt-20" to="/login">我要點燈</router-link>
  </div>
</template>

<script>
// import { Button } from 'element-ui'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      form: {}
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.home-layer {
  width: 100%;
  max-width: 100%;
  background-image: url('~@/assets/images/home-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .logo {
    max-height: 108px;
    width: auto;
    object-fit: contain;
  }

  .deco-line {
    display: block;
    border: none;
    width: 60px;
    height: 4px;
  }
}
</style>
