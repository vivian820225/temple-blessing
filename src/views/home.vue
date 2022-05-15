<template>
  <div class="home-layer h-full flex flex-col justify-center items-center">
    <img class="logo" src="@/assets/images/home-logo.png" alt="楊梅開基玉玄宮" />
    <hr class="deco-line bg-secondary mt-5 mb-6 mx-auto" />
    <p class="sub-title lg:text-xl text-lg text-center text-white font-bold lg:leading-10">
      來自元宇宙的神祕宮廟<br />
      絕世無雙的保護力，強大的祝福能量
    </p>
    <button type="button" class="btn-primary btn-xl mt-4 lg:mt-20 md:mt-12" @click="redirectTo">我要點燈</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      form: {}
    }
  },
  methods: {
    redirectTo () {
      if (localStorage.getItem('access_token')) {
        this.$router.push({ path: '/blessing' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
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

@media screen and (max-width: 1024px) {
  .home-layer {
    .logo {
      max-height: 68px;
    }
  }
}

@media screen and (max-width: 520px) {
  .home-layer {
    .logo {
      max-height: 48px;
    }
  }
}
</style>
