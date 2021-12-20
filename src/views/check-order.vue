<template>
  <div class="linear-bg-color flex flex-col">
    <div class="flex items-center justify-between mb-8 select-none">
      <router-link to="/" class="cursor-pointer">
        <img src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
      <router-link to="/record" class="btn-solid-w">查看點燈紀錄</router-link>
    </div>
    <div class="flex flex-col">
      <h2 class="text-3xl text-center text-white font-bold mb-8">- 請確認您的付款資訊 -</h2>
      <div class="order-wrapper shadow-box p-6">123</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckOrder'
}
</script>

<style lang="scss">
.order-wrapper {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
}
</style>
