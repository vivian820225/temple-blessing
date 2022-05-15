<template>
  <div class="light-modal" v-if="Object.keys(info).length">
    <div class="light-title-wrapper lg:mb-8 mb-4">
      <h2 class="light-title mb-2">{{ info.name }}</h2>
      <p class="text-base text-secondary">{{info.description}}</p>
    </div>
    <Form ref="form" :model="form" label-position="top" class="light-modal-body">
      <div class="flex md:mb-6 mb-4">
        <Radio v-model="hasCompany" :label="true">我有公司行號</Radio>
        <Radio v-model="hasCompany" :label="false">無公司行號</Radio>
      </div>
      <div class="relative" v-show="hasCompany">
        <div class="md:mb-6 mb-4" >
          <FormItem label="公司名稱">
            <Input v-model="form.company_name" placeholder="公司名稱" />
          </FormItem>
        </div>
        <FormItem label="公司登記地址">
          <Input v-model="form.company_address" placeholder="請輸入完整地址" />
        </FormItem>
        <hr class="divider md:my-8 my-4" />
      </div>
      <div class="md:mb-6 mb-4">
        <FormItem label="祈福者">
          <Input v-model="form.name" placeholder="請輸入姓名" />
        </FormItem>
      </div>
      <div class="md:mb-6 mb-4">
        <FormItem label="出生年月日">
          <DatePicker
            v-model="form.birthday"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="選擇日期"
            class="w-full"
          />
        </FormItem>
      </div>
      <div class="md:mb-6 mb-4">
        <FormItem label="祈福者居住地址">
          <Input v-model="form.address" placeholder="請輸入完整地址" />
        </FormItem>
      </div>
      <div class="flex items-center md:mb-6 mb-4">
        <InputNumber v-model="form.amount" :min="1" :max="10" label="盞" />
        <p class="text-lg ml-4 flex items-center whitespace-nowrap">
          盞 x <span class="lg:text-2xl text-xl font-bold ml-2"> {{ info.price }} 元</span>
        </p>
      </div>
      <Checkbox v-model="isChecked" class="mb-8">
        我了解並同意
        <a href="javascript:;" class="text-secondary underline">個資蒐集條款</a>
      </Checkbox>
      <button class="btn-primary btn-sm w-full" :disabled="!valid" @click.prevent="onSubmit">
        {{mode === 'create' ? '點燈' : '確認修改'}}
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, InputNumber, Radio, DatePicker, Checkbox } from 'element-ui'
import Publish from '@/api/publish.js'
import Tools from '@/utils/tools.js'

export default {
  name: 'LightModal',
  components: { Form, FormItem, Input, InputNumber, Radio, DatePicker, Checkbox },
  props: {
    mode: {
      type: String,
      default: 'create'
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      hasCompany: false,
      isChecked: false,
      form: {
        name: '',
        address: '',
        payment_channel: 'cash',
        remittance_account: '',
        amount: 1,
        company_name: '',
        company_address: '',
        birthday: ''
      }
    }
  },
  computed: {
    valid () {
      if (!this.isChecked) return false
      if (this.form.name.length < 1) return false
      if (this.form.address.length < 1) return false
      if (this.form.birthday.length < 1) return false

      return true
    },
    age () {
      const birthDayTime = new Date(this.form.birthday).getTime()
      const now = new Date().getTime()
      return Math.ceil((now - birthDayTime) / 31536000000) - 1
    },
    phone () {
      return this.$store.state.userInfo.phoneNumber
    }
  },
  watch: {
    info: {
      handler (data) {
        this.form = {
          ...data,
          name: data.username
        }
      }
    }
  },
  created () {
    if (this.mode === 'edit') {
      if (this.info.company_name && this.info.company_name.length) this.hasCompany = true
      this.isChecked = true
      this.form = {
        ...this.info,
        name: this.info.username
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {
        name: '',
        address: '',
        payment_channel: 'cash',
        remittance_account: '',
        amount: 1,
        company_name: '',
        company_address: '',
        birthday: ''
      }
    },
    onSubmit () {
      const param = {
        age: this.age,
        phone: this.phone,
        ...this.form
      }

      const httpMethod = this.mode === 'create' ? 'createCandleOrder' : 'updateCandleOrder'

      Publish[httpMethod](this.info.id, param).then(res => {
        if (res) {
          const orderInfo = {
            birthday: this.form.birthday,
            ...res
          }
          this.$store.commit('SET_ORDER', orderInfo)

          if (this.mode === 'create') {
            this.$router.push('/check-order')
          } else {
            Tools.successTips('修改成功')
            this.$emit('close')
          }
        }
      }).catch(() => {
        this.resetForm()
        this.$store.commit('RESET_ORDER')
        Tools.errorTips('系統異常，請稍後再試一次')
      })
    }
  }
}
</script>

<style lang="scss">
.light-modal-body {
  padding: 0 60px;
  padding-bottom: 24px;
}
.light-title-wrapper {
  padding-left: 24px;
  padding-right: 16px;
  position: relative;
  border-left: 32px solid var(--secondary);
  .light-title {
    font-size: 36px;
    font-weight: bold;
    color: var(--primary);
    text-shadow: 0px 0px 24px var(--secondary-light);
  }
}

@media screen and (max-width: 1024px) {
  .light-title-wrapper {
    padding-left: 16px;
    border-left-width: 20px;
    .light-title {
      font-size: 28px;
    }
  }

  .light-modal-body {
    padding: 0 40px 24px 40px;
  }
}

@media screen and (max-width: 520px) {
  .light-title-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    border-left-width: 8px;
    .light-title {
      font-size: 24px;
    }
  }

  .light-modal-body {
    padding: 0 16px 24px 16px;
  }
}
</style>
