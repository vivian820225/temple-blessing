import axios from '@/utils/axios'

const Publish = {
  fetchCandleTypes (templeId) {
    return axios({
      url: `/candle/v1_0/candle-type/usr/${templeId}`,
      method: 'get'
    })
  },
  fetchCandleInfo (templeId, typeId) {
    return axios({
      url: `/candle/v1_0/candle-type/usr/${templeId}/${typeId}`,
      method: 'get'
    })
  }
}

export default Publish
