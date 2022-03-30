import axios from '@/utils/axios'

const Publish = {
  fetchCandleTypes (templeId) {
    return axios({
      url: `/candle/v1_0/public/candle-type/${templeId}`,
      method: 'get'
    })
  },
  fetchCandleInfo (templeId, candleType) {
    return axios({
      url: `/candle/v1_0/public/candle-type/${templeId}/${candleType}`,
      method: 'get'
    })
  }
}

export default Publish
