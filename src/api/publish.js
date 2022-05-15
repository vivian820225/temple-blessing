import axios from '@/utils/axios'

const Publish = {
  /** 取得所有燈項 */
  fetchCandleTypes () {
    return axios({
      url: `/candle/v1_0/candle-type/usr/${process.env.VUE_APP_TEMPLE_ID}`,
      method: 'get'
    })
  },
  /** 取得單一燈種下所有燈項 */
  fetchCandleInfo (typeId) {
    return axios({
      url: `/candle/v1_0/candle-type/usr/${process.env.VUE_APP_TEMPLE_ID}/${typeId}`,
      method: 'get'
    })
  },
  /** 查詢點燈資訊 */
  fetchCandleRecord (phoneNum) {
    return axios({
      url: `/candle/v1_0/registration/usr/${process.env.VUE_APP_TEMPLE_ID}/${phoneNum}`,
      method: 'get'
    })
  },
  /** 送出點燈訂單 */
  createCandleOrder (typeId, data) {
    return axios({
      url: `/candle/v1_0/registration/usr/${process.env.VUE_APP_TEMPLE_ID}/${typeId}`,
      method: 'post',
      data
    })
  },
  /** 更新點燈訂單 */
  updateCandleOrder (typeId, data) {
    return axios({
      url: `/candle/v1_0/registration/usr/${process.env.VUE_APP_TEMPLE_ID}/${typeId}`,
      method: 'put',
      data
    })
  },
  /** 確認付款完成 */
  updateCandleOrderStatus (typeId) {
    return axios({
      url: `/candle/v1_0/registration/usr/${process.env.VUE_APP_TEMPLE_ID}/${typeId}`,
      method: 'patch'
    })
  }
}

export default Publish
