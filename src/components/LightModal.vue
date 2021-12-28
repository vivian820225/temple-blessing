<template>
  <div class="light-modal" v-if="Object.keys(lightInfo).length">
    <div class="light-title-wrapper lg:mb-8 mb-4">
      <h2 class="light-title mb-2">{{ lightInfo.name }}</h2>
      <p class="text-base text-secondary">
        在中國民間信仰上，在春節正月期間，為自己點光明燈，有「照耀前途」的意義。
      </p>
    </div>
    <Form ref="form" :model="form" label-position="top" class="light-modal-body">
      <template v-if="lightInfo.hasCompany">
        <div class="flex md:mb-6 mb-4">
          <Radio v-model="form.hasCompany" :label="true">我有公司行號</Radio>
          <Radio v-model="form.hasCompany" :label="false">無公司行號</Radio>
        </div>
        <div class="md:mb-6 mb-4">
          <FormItem label="公司名稱">
            <Input v-model="form.companyName" placeholder="公司名稱" />
          </FormItem>
        </div>
        <FormItem label="公司登記地址">
          <Input v-model="form.companyAddress" placeholder="請輸入完整地址" />
        </FormItem>
        <hr class="divider md:my-8 my-4" />
      </template>
      <div class="md:mb-6 mb-4">
        <FormItem label="祈福者">
          <Input v-model="form.name" placeholder="請輸入姓名" />
        </FormItem>
      </div>
      <div class="md:mb-6 mb-4">
        <FormItem label="出生年月日">
          <DatePicker v-model="form.birthday" type="date" placeholder="選擇日期" class="w-full" />
        </FormItem>
      </div>
      <div class="md:mb-6 mb-4">
        <FormItem label="祈福者居住地址">
          <Input v-model="form.address" placeholder="請輸入完整地址" />
        </FormItem>
      </div>
      <div class="flex items-center md:mb-6 mb-4">
        <InputNumber v-model="form.unit" @change="handleChange" :min="1" :max="10" label="盞" />
        <p class="text-lg ml-4 flex items-center whitespace-nowrap">
          盞 x <span class="lg:text-2xl text-xl font-bold ml-2"> {{ lightInfo.price }} 元</span>
        </p>
      </div>
      <Checkbox v-model="form.checked" class="mb-8">
        我了解並同意
        <a href="javascript:;" class="text-secondary underline">個資蒐集條款</a>
      </Checkbox>
      <button class="btn-primary btn-sm w-full" @click.prevent="onSubmit">點燈</button>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, InputNumber, Radio, DatePicker, Checkbox } from 'element-ui'

export default {
  name: 'LightModal',
  components: { Form, FormItem, Input, InputNumber, Radio, DatePicker, Checkbox },
  props: {
    lightInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {
        hasCompany: true,
        unit: 1,
        checked: false
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    onSubmit () {
      this.$router.push('/check-order')
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
