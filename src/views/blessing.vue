<template>
  <div class="blessing-layer">
    <div class="flex">
      <router-link to="/"><img src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" /></router-link>
      <router-link to="/record">查看點燈紀錄</router-link>
    </div>
    <div class="blessing-container">
      <h2>請選擇類型</h2>
      <div class="example-3d">
        <swiper ref="lightSwiper" class="swiper" :options="swiperOption">
          <template v-for="(category, index) in lightCategory">
            <SwiperSlide :key="index">
              <div class="light-card">
                <h3 class="light-card-title">{{ category.title }}</h3>
                <div class="light-card-body">
                  <div
                    class="light-card-item"
                    v-for="(light, lightIndex) in category.list"
                    :key="lightIndex"
                  >
                    {{ light.name }}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </template>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Blessing',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      lightCategory: [
        {
          title: '財運亨通',
          list: [
            {
              name: '財神燈'
            },
            {
              name: '財寶神衣燈'
            }
          ]
        },
        {
          title: '平安健康',
          list: [
            {
              name: '太歲燈'
            },
            {
              name: '光明燈'
            },
            {
              name: '健康燈'
            }
          ]
        },
        {
          title: '學運智慧',
          list: [
            {
              name: '文昌燈'
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
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.example-3d {
  width: 60%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper {
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    background-color: #2c8dfb;
    background-position: center;
    background-size: cover;
    color: #fff;
  }

  .swiper-pagination {
    /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
}
</style>
