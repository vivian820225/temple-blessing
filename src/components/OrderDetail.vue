<template>
  <div class="order-detail" v-if="Object.keys(orderInfo).length">
    <h2 class="md:text-2xl text-xl md:mb-4 mb-2 border-b md:pb-4 pb-2">訂單詳情</h2>
    <div class="md:flex items-start justify-between">
      <div class="flex flex-col">
        <p>祈福者：{{ orderInfo.name }}</p>
        <p>點燈時間：{{ orderInfo.date }}</p>
        <p>點燈種類：{{ orderInfo.type }}</p>
        <p>電話：{{ orderInfo.phone }}</p>
        <p>金額：{{ orderInfo.price }}</p>
        <p>帳號後五碼：{{ orderInfo.account }}</p>
        <p>地址：{{ orderInfo.address }}</p>
        <p v-if="orderInfo.state === '已付款'">確認匯款時間：{{ orderInfo.checkedDate }}</p>
      </div>
      <p
        class="state-tag"
        :class="{
          checked: orderInfo.state === '已付款',
          unchecked: orderInfo.state === '尚未匯款',
          failed: orderInfo.state === '已取消'
        }"
      >
        {{ orderInfo.state }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.order-detail {
  padding: 24px 60px;
  p {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .state-tag {
    font-size: 16px;
    border: 1px solid;
    padding: 8px 16px;
    border-radius: 8px;
    text-align: center;
    &.checked {
      color: rgb(64, 202, 0);
      border-color: rgb(64, 202, 0);
    }
    &.unchecked {
      color: rgb(216, 104, 0);
      border-color: rgb(216, 104, 0);
    }
    &.failed {
      color: rgb(216, 0, 0);
      border-color: rgb(216, 0, 0);
    }
  }
}

@media screen and (max-width: 1024px) {
  .order-detail {
    padding: 24px;
  }
}

@media screen and (max-width: 520px) {
  .order-detail {
    padding: 0 16px 4px 16px;
    p {
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
}
</style>
