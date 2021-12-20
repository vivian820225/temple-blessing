<template>
  <div class="blessing-layer linear-bg-color">
    <div class="flex items-center justify-between mb-8 select-none">
      <router-link to="/" class="cursor-pointer">
        <img src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
      <router-link to="/record" class="btn-solid-w">查看點燈紀錄</router-link>
    </div>
    <div class="blessing-container">
      <h2 class="blessing-title">請選擇類型</h2>
      <div class="blessing-list-wrapper">
        <swiper ref="lightSwiper" class="swiper" :options="swiperOption">
          <SwiperSlide v-for="(category, index) in lightCategory" :key="index">
            <div class="light-card">
              <h3 class="light-card-title">{{ category.title }}</h3>
              <ul class="light-card-body">
                <li
                  class="light-card-item"
                  v-for="(light, lightIndex) in category.list"
                  :key="lightIndex"
                  @click="openModal(light)"
                >
                  <span>- {{ light.name }} -</span>
                </li>
              </ul>
            </div>
          </SwiperSlide>
        </swiper>
      </div>
    </div>
    <Dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false">取 消</button>
        <button type="primary" @click="dialogVisible = false">确 定</button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from 'element-ui'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Blessing',
  components: {
    Swiper,
    SwiperSlide,
    Dialog
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
        }
      },
      dialogVisible: false
    }
  },
  methods: {
    openModal (item) {
      this.dialogVisible = true
      console.log('light', item)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style lang="scss">
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

    .light-card-title {
      padding: 8px 48px;
      color: #fff;
      background-color: var(--secondary);
      border-radius: 48px;
      position: relative;
      margin-bottom: 16px;
    }
    .light-card-body {
      display: flex;
      flex-direction: column;
      padding-bottom: 16px;
    }
    .light-card-item {
      color: var(--primary);
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
}
</style>
