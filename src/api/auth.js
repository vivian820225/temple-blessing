import axios from '@/utils/axios'

const Auth = {
  SmsCodeLogin (data) {
    return axios({
      url: '/auth/sendSMS',
      method: 'post',
      data
    })
  },
  VerifySmsCode (data) {
    return axios({
      url: '/auth/verifyCode',
      method: 'post',
      data
    })
  }
}

export default Auth
