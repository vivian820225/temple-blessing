<template>
  <div class="linear-bg-color flex flex-col">
    <div class="flex items-center justify-between md:mb-8 mb-4 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅開基玉玄宮" />
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
          <p>祈福者: {{ orderInfo.name }}</p>
          <p>祈福燈種: {{ orderInfo.type_name }}</p>
          <p>總計: $ {{ orderInfo.price }}</p>
          <h3 class="mt-4 mb-2">付款方式：</h3>
          <Radio class="mb-2" v-model="form.payment" label="transform">匯款</Radio>
          <p class="text-secondary font-bold md:mb-8 mb-4">
            請匯款至 012 - 59487 - 59487 - 59487 (富邦銀行)
          </p>
          <div class="md:mb-12 mb-6">
            <FormItem label="輸入您的匯款帳號後五碼">
              <Input v-model="form.remittance_account" maxLength="5" />
            </FormItem>
          </div>

          <button class="btn-secondary btn-sm w-full mb-2" @click.prevent="onRedo">修改訂單</button>
          <button class="btn-primary btn-sm w-full" :disabled="!valid" @click.prevent="onSubmit">匯款完成</button>
        </Form>
      </div>
    </div>

    <Dialog title="" :visible.sync="dialogVisible" class="dialog-style" :before-close="handleClose">
      <LightModal :info="orderTempInfo" :mode="'edit'" @close="dialogVisible = false" />
    </Dialog>
  </div>
</template>

<script>
import { Form, FormItem, Input, Radio, Dialog } from 'element-ui'
import LightModal from '@/components/LightModal'
import Tools from '@/utils/tools.js'
import Publish from '@/api/publish.js'

export default {
  name: 'CheckOrder',
  components: { Form, FormItem, Input, Radio, Dialog, LightModal },
  data () {
    return {
      form: {
        payment: 'transform',
        remittance_account: ''
      },
      dialogVisible: false
    }
  },
  computed: {
    orderInfo () {
      return this.$store.state.candleOrder
    },
    orderTempInfo () {
      return {
        ...this.orderInfo,
        name: this.orderInfo.type_name,
        username: this.orderInfo.name
      }
    },
    valid () {
      if (!this.form.remittance_account.length) return false
      return true
    }
  },
  methods: {
    onRedo () {
      this.dialogVisible = true
    },
    handleClose (done) {
      Tools.confirmBox({
        message: '確定取消嗎？',
        confirm: () => {
          this.dialogVisible = false
        }
      })
    },
    onSubmit () {
      Publish.updateCandleOrderStatus(this.orderInfo.id).then(res => {
        if (res) {
          Tools.successTips('訂單付款狀態更新成功')
          this.$router.push('/finished')
        }
      }).catch(() => {
        Tools.errorTips('訂單異常，請聯絡客服人員')
      })
    },
    logout () {
      this.$store.dispatch('logout')
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
