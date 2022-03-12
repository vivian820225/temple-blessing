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
      method: 'get',
      params: data
    })
  }
}

export default Auth
