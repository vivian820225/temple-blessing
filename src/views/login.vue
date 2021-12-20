<template>
  <div class="login-layer flex">
    <div class="login-cover">
      <img src="@/assets/images/login-img.jpg" alt="登入點燈系統" />
    </div>
    <div class="login-container flex-auto flex items-center justify-center">
      <div class="login-content flex flex-col">
        <h2 class="text-5xl text-secondary font-bold mb-10">歡迎祈福、感恩</h2>
        <Form ref="form" :model="form" label-position="top">
          <template v-if="isFirstStep">
            <div class="mb-6">
              <FormItem label="您的大名">
                <Input v-model="form.name" placeholder="請輸入您的姓名" />
              </FormItem>
            </div>
            <div class="flex items-end mb-20">
              <FormItem label="行動電話" class="flex-auto">
                <Input v-model="form.phone" placeholder="請輸入行動電話" />
              </FormItem>
              <button class="btn-primary btn-sm ml-2" @click="getCode">發送簡訊驗證碼</button>
            </div>
            <router-link to="/" class="underline-link text-white text-lg flex items-center">
              <i class="w-16 h-16 icon-arrow-w-left mr-2"></i>
              <span>返回首頁</span>
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-end mb-2">
              <FormItem label="驗證碼" class="flex-auto">
                <Input v-model="form.phone" placeholder="請輸入簡訊驗證碼" />
              </FormItem>
              <button class="btn-primary btn-sm ml-2" @click="onSubmit">送出</button>
            </div>
            <p class="mb-20 text-white">
              沒有收到簡訊？
              <a @click="getCode" class="underline-link">
                <span>重新發送</span>
              </a>
            </p>
            <a
              @click.prevent="isFirstStep = true"
              class="underline-link text-white text-lg flex items-center"
            >
              <i class="w-16 h-16 icon-arrow-w-left mr-2"></i>
              <span>返回上一步</span>
            </a>
          </template>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'
export default {
  name: 'Login',
  components: {
    Form,
    FormItem,
    Input
  },
  data () {
    return {
      isFirstStep: true,
      form: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    getCode () {
      this.isFirstStep = false
      console.log('getCode!')
    },
    onSubmit () {
      this.$router.push('/blessing')
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss">
.login-container {
  position: relative;
  background: linear-gradient(227deg, #613400 0%, #a05700 100%);
  &::before {
    content: '';
    display: block;
    width: 30%;
    max-width: 362px;
    height: 680px;
    background-repeat: no-repeat;
    background-image: url('~@/assets/images/circle-bg-1.png');
    background-size: contain;
    background-position: left top;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  &::after {
    content: '';
    display: block;
    width: 30%;
    max-width: 342px;
    height: 358px;
    background-repeat: no-repeat;
    background-image: url('~@/assets/images/circle-bg-3.png');
    background-position: right bottom;
    background-size: contain;
    position: absolute;
    bottom: 0;
    right: 0;
    pointer-events: none;
  }
  .login-content {
    width: 60%;
    max-width: 576px;
    z-index: 1;
    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
