<template>
  <div class="login-layer">
    <div class="login-cover">
      <img src="@/assets/images/login-img.jpg" alt="登入點燈系統" />
    </div>
    <div class="login-container flex-auto flex items-center justify-center">
      <div class="login-content flex flex-col">
        <h2 class="lg:text-5xl md:text-4xl text-3xl text-secondary font-bold mb-10">
          歡迎祈福、感恩
        </h2>
        <Form ref="form" :model="form" label-position="top">
          <template v-if="isFirstStep">
            <div class="mb-6">
              <FormItem label="您的大名">
                <Input v-model="form.name" placeholder="請輸入您的姓名" />
              </FormItem>
            </div>
            <div class="flex items-end md:mb-20 mb-10">
              <FormItem label="行動電話" class="flex-auto">
                <Input v-model="form.phone" placeholder="請輸入行動電話" />
              </FormItem>
              <button class="btn-primary btn-sm ml-2" @click.prevent="getSMSCode">發送簡訊驗證碼</button>
            </div>
            <router-link
              to="/"
              class="underline-link text-white md:text-lg text-base flex items-center"
            >
              <i class="w-16 h-16 icon-arrow-w-left mr-2"></i>
              <span>返回首頁</span>
            </router-link>
          </template>
          <template v-else>
            <div class="flex items-end mb-2">
              <FormItem label="驗證碼" class="flex-auto">
                <Input v-model="form.code" placeholder="請輸入簡訊驗證碼" />
              </FormItem>
              <button class="btn-primary btn-sm ml-2" @click.prevent="onSubmit">送出</button>
            </div>
            <p class="md:mb-20 mb-10 text-white">
              沒有收到簡訊？
              <a @click.prevent="getSMSCode" class="underline-link">
                <span>重新發送</span>
              </a>
            </p>
            <a
              @click.prevent="isFirstStep = true"
              class="underline-link text-white md:text-lg text-base flex items-center"
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
import Tools from '@/utils/tools.js'
import Auth from '@/api/auth'
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
        phone: '',
        code: ''
      }
    }
  },
  methods: {
    getSMSCode () {
      const param = {
        templeId: 'b0b044e7-4b1a-4a63-92f4-e4fc2ace8218',
        phoneNumber: this.form.phone
      }
      Auth.SmsCodeLogin(param).then((res) => {
        if (res) {
          this.isFirstStep = false
        }
      })
    },
    onSubmit () {
      console.log('submit!')
      const param = {
        templeId: 'b0b044e7-4b1a-4a63-92f4-e4fc2ace8218',
        phoneNumber: this.form.phone,
        verificationCode: this.form.code
      }
      Auth.VerifySmsCode(param).then((res) => {
        console.log('VerifySmsCode', res)
        if (res) {
          localStorage.setItem('access_token', res.token)
          if (res.token) {
            Tools.successTips('登入成功')
            this.$router.push('/blessing')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-layer {
  display: flex;
}
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

@media screen and (max-width: 1024px) {
  .login-layer {
    flex-direction: column;
  }

  .login-cover {
    height: 120px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .login-container {
    &::before {
      height: 480px;
    }
    &::after {
      height: 200px;
    }
    .login-content {
      width: calc(100% - 32px);
    }
  }
}

@media screen and (max-width: 520px) {
  .login-container {
    &::before {
      height: 320px;
    }
    &::after {
      height: 120px;
    }
  }
}
</style>
