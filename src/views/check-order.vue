<template>
  <div class="linear-bg-color flex flex-col">
    <div class="flex items-center justify-between md:mb-8 mb-4 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
      <div class="flex items-center justify-end">
        <router-link to="/record" class="btn-solid-w whitespace-nowrap">
        <span class="sm:inline-block hidden">查看</span>點燈紀錄
        </router-link>
        <p class="text-xl text-white ml-4 cursor-pointer" @click="logout">登出</p>
      </div>
    </div>
    <div class="flex flex-col">
      <h2 class="lg:text-3xl md:text-2xl text-xl text-center text-white font-bold md:mb-8 mb-4">
        - 請確認您的付款資訊 -
      </h2>
      <div class="order-wrapper shadow-box md:p-6 p-4">
        <Form ref="form" :model="form" label-position="top">
          <p>祈福者: 陳建成</p>
          <p>生日: 1994/07/22</p>
          <p>地址: 陶珠隱園市陶珠隱園路陶珠隱園巷87號87樓</p>
          <h3 class="mt-4 mb-2">付款方式：</h3>
          <Radio class="mb-2" v-model="form.payment" label="transform">匯款</Radio>
          <p class="text-secondary font-bold md:mb-8 mb-4">
            請匯款至 012 - 59487 - 59487 - 59487 (富邦銀行)
          </p>
          <div class="md:mb-12 mb-6">
            <FormItem label="輸入您的匯款帳號後五碼">
              <Input v-model="form.number" />
            </FormItem>
          </div>
          <button class="btn-primary btn-sm w-full" @click.prevent="onSubmit">匯款完成</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Radio } from 'element-ui'
export default {
  name: 'CheckOrder',
  components: { Form, FormItem, Input, Radio },
  data () {
    return {
      form: {
        payment: 'transform',
        number: 56789
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.$router.push('/finished')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.order-wrapper {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  font-size: 20px;
  line-height: 1.8;
}

@media screen and (max-width: 1024px) {
  .order-wrapper {
    font-size: 16px;
  }
}
</style>
