<template>
  <div class="blessing-layer linear-bg-color">
    <div class="flex items-center justify-between md:mb-8 mb-4 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
      <div class="flex items-center justify-end">
        <router-link to="/record" class="btn-solid-w whitespace-nowrap">
          <span class="sm:inline-block hidden">查看</span>點燈紀錄
        </router-link>
        <p class="text-xl text-white ml-4 cursor-pointer" @click="logout">登出</p>
      </div>
    </div>
    <div class="blessing-container">
      <h2 class="blessing-title">請選擇類型</h2>
      <div class="blessing-list-wrapper">
        <Swiper ref="lightSwiper" class="swiper" :options="swiperOption">
          <SwiperSlide v-for="(category, index) in candleTypeGroup" :key="index">
            <div class="light-card">
              <h3 class="light-card-title">{{ category.typeName }}</h3>
              <ul class="light-card-body">
                <li
                  class="light-card-item"
                  v-for="(light, lightIndex) in category.candleList"
                  :key="lightIndex"
                  @click="openModal(light)"
                >
                  <span>- {{ light.name }} -</span>
                </li>
              </ul>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </Swiper>
      </div>
    </div>
    <Dialog title="" :visible.sync="dialogVisible" class="dialog-style" :before-close="handleClose">
      <LightModal :info="candleInfo" />
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from 'element-ui'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import LightModal from '@/components/LightModal'
import Tools from '@/utils/tools.js'
import Publish from '@/api/publish.js'
import { CandleType } from '@/config'

export default {
  name: 'Blessing',
  components: {
    Swiper,
    SwiperSlide,
    Dialog,
    LightModal
  },
  data () {
    return {
      candleInfo: {},
      candleTypes: [],
      lightCategory: [
        {
          title: '財運亨通',
          list: [
            {
              name: '財神燈',
              hasCompany: true,
              price: 600
            },
            {
              name: '財寶神衣燈',
              hasCompany: true,
              price: 800
            }
          ]
        },
        {
          title: '平安健康',
          list: [
            {
              name: '太歲燈',
              hasCompany: false,
              price: 500
            },
            {
              name: '光明燈',
              hasCompany: false,
              price: 500
            },
            {
              name: '健康燈',
              hasCompany: false,
              price: 500
            }
          ]
        },
        {
          title: '學運智慧',
          list: [
            {
              name: '文昌燈',
              hasCompany: false,
              price: 300
            }
          ]
        }
      ],
      swiperOption: {
        effect: 'coverflow',
        initialSlide: 1,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      dialogVisible: false
    }
  },
  computed: {
    candleTypeGroup () {
      const list = []
      const types = new Set(this.candleTypes.map(candle => candle.type))

      types.forEach(type => {
        const candles = this.candleTypes.filter(candle => candle.type === type)
        const obj = {
          type: type,
          typeName: CandleType[type],
          candleList: candles
        }

        list.push(obj)
      })

      return list
    }
  },
  created () {
    const templeId = 'b0b044e7-4b1a-4a63-92f4-e4fc2ace8218'
    this.getCandleTypes(templeId)
  },
  methods: {
    async getCandleTypes (templeId) {
      const res = await Publish.fetchCandleTypes(templeId)
      this.candleTypes = res
    },
    async getCandleInfo (typeId) {
      const templeId = 'b0b044e7-4b1a-4a63-92f4-e4fc2ace8218'
      const res = await Publish.fetchCandleTypes(templeId, typeId)
      this.candleInfo = res
    },
    openModal (item) {
      // this.getCandleInfo(item.id)
      this.candleInfo = item
      if (Object.keys(this.candleInfo).length) {
        this.dialogVisible = true
      }
    },
    handleClose (done) {
      Tools.confirmBox({
        message: '確定取消嗎？',
        confirm: () => {
          // Call API
          this.dialogVisible = false
        }
      })
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.blessing-layer {
  display: flex;
  flex-direction: column;
}
.blessing-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: var(--secondary);

  &::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    margin-top: 16px;
    border-style: solid;
    border-width: 24px 18px 0 18px;
    border-color: var(--secondary) transparent transparent transparent;
  }
}

.blessing-container {
  flex: 1;
}

.blessing-list-wrapper {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;

  .swiper {
    width: 100%;
    height: 100%;
    .swiper-slide {
      display: flex;
      justify-content: center;
      max-width: 320px;
      min-height: 300px;
      padding: 16px;
      border-radius: 16px;
      font-weight: bold;
      font-size: 36px;
      text-align: center;
      background-color: #fff;
      overflow: hidden;
      &-active {
        border: 3px solid var(--secondary);
      }
    }
  }

  .light-card {
    position: relative;
    user-select: none;
    display: flex;
    flex-direction: column;
  }
  .light-card-title {
    padding: 8px 48px;
    color: #fff;
    background-color: var(--secondary);
    border-radius: 48px;
    position: relative;
    margin-bottom: 16px;
    font-size: 32px;
  }
  .light-card-body {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
  }
  .light-card-item {
    color: var(--primary);
    font-size: 28px;
    cursor: pointer;

    &:not(:last-of-type) {
      margin-bottom: 24px;
    }

    &:hover,
    &:focus {
      text-shadow: 0 0 24px var(--secondary-light);
      background-image: url('~@/assets/images/light-bg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
}

@media screen and (max-width: 1024px) {
  .blessing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .blessing-title {
    font-size: 28px;
    &::after {
      margin-top: 12px;
      border-width: 18px 12px 0 12px;
    }
  }

  .blessing-list-wrapper {
    padding: 24px 0;
    .light-card-title {
      font-size: 28px;
    }
    .light-card-item {
      font-size: 30px;
    }
  }
}

@media screen and (max-width: 520px) {
  .blessing-title {
    font-size: 24px;
  }

  .blessing-list-wrapper {
    padding: 16px 0;
    .swiper {
      .swiper-slide {
        min-height: 240px;
      }
    }
    .light-card-title {
      font-size: 20px;
    }
    .light-card-item {
      font-size: 24px;
      &:not(:last-of-type) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
