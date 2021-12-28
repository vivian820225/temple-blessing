<template>
  <div class="linear-bg-color flex flex-col">
    <div class="flex items-center justify-between mb-8 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
    </div>
    <div class="flex flex-col items-center justify-center flex-auto">
      <h2
        class="
          lg:text-5xl
          md:text-3xl
          text-2xl
          font-bold
          text-white text-center
          leading-relaxed
          md:mb-16
          mb-8
        "
        style="text-shadow: 0px 0px 24px #ffb800"
      >
        謝謝您，祝福您<br />心想事成、萬事順利
      </h2>
      <router-link to="/record" class="btn-primary btn-xl md:mb-8 mb-4">查看點燈紀錄</router-link>
      <router-link to="/" class="underline-link text-white text-lg flex items-center">
        <span>返回首頁</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Finished'
}
</script>

<style lang="scss">
</style>
