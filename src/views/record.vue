<template>
  <div class="record-layer linear-bg-color">
    <div class="flex items-center justify-between md:mb-8 mb-4 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅玉玄宮" />
      </router-link>
      <div class="flex items-center justify-end">
        <router-link to="/blessing" class="btn-solid-w whitespace-nowrap">
        <span class="sm:inline-block hidden">返回</span>點燈列表
      </router-link>
        <p class="text-xl text-white ml-4 cursor-pointer" @click="logout">登出</p>
      </div>
    </div>
    <div class="flex flex-col record-container">
      <div class="md:flex items-center justify-between md:mb-6 mb-2">
        <h2 class="md:text-2xl text-xl text-white font-bold whitespace-nowrap">我的點燈紀錄</h2>
        <p class="md:text-lg text-sm text-white whitespace-nowrap">收款帳號: 012 - 420168274996</p>
      </div>
      <div class="shadow-box">
        <Table :data="tableData" height="400" class="record-table" border stripe>
          <TableColumn prop="date" label="點燈時間" align="center"> </TableColumn>
          <TableColumn prop="type" label="燈種" align="center"> </TableColumn>
          <TableColumn label="金額" align="center">
            <template slot-scope="scope">
              <span>${{ scope.row.price }}</span>
            </template>
          </TableColumn>
          <TableColumn prop="account" label="匯款帳號後五碼" align="center"> </TableColumn>
          <TableColumn prop="state" label="狀態" align="center"> </TableColumn>
          <TableColumn label="詳情" align="center" width="120" fixed="right">
            <template slot-scope="scope">
              <button
                class="btn-record-detail whitespace-nowrap"
                @click.prevent="openDetail(scope.row)"
              >
                <span class="md:inline-block hidden">詳細資料</span>
                <span class="md:hidden inline-block">詳情</span>
              </button>
            </template>
          </TableColumn>
        </Table>
        <Pagination background layout="prev, pager, next" :total="pageTotal"> </Pagination>
      </div>
    </div>
    <Dialog title="" :visible.sync="dialogVisible" class="dialog-style">
      <OrderDetail :order-info="order" />
    </Dialog>
  </div>
</template>

<script>
import { Table, TableColumn, Pagination, Dialog } from 'element-ui'
import OrderDetail from '@/components/OrderDetail.vue'
export default {
  name: 'Record',
  components: { Table, TableColumn, Pagination, Dialog, OrderDetail },
  data () {
    return {
      pageTotal: 1,
      tableData: [
        {
          date: '2021/11/09 22:40',
          name: '王大明',
          type: '財寶神衣燈',
          price: 3600,
          phone: '0987383383',
          birthday: '2000-01-12',
          address: ' 陶珠隱園市陶珠隱園路陶珠隱園巷87號87樓',
          account: 56753,
          state: '已付款',
          payment: 'transform',
          checkedDate: '2021/11/10 08:59'
        },
        {
          date: '2021/12/19 12:40',
          name: '巧克力',
          type: '光明燈',
          price: 500,
          phone: '0987383383',
          birthday: '1999-07-28',
          address: ' 陶珠隱園市陶珠隱園路陶珠隱園巷87號87樓',
          account: 12753,
          state: '尚未匯款',
          payment: 'transform',
          checkedDate: '2021/12/20 08:59'
        },
        {
          date: '2021/12/19 12:40',
          name: '巧克力',
          type: '光明燈',
          price: 500,
          phone: '0987383383',
          birthday: '1999-07-28',
          address: ' 陶珠隱園市陶珠隱園路陶珠隱園巷87號87樓',
          account: 12753,
          state: '已取消',
          payment: 'transform',
          checkedDate: '2021/12/20 08:59'
        }
      ],
      dialogVisible: false,
      order: {}
    }
  },
  methods: {
    openDetail (order) {
      this.order = order
      this.dialogVisible = true
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.record-container {
  width: calc(100% - 48px);
  max-width: 1280px;
  margin: 0 auto;
}

.record-table {
  border-radius: 16px;
  .btn-record-detail {
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 4px 16px;
    &:hover,
    &:focus {
      color: #fff;
      background-color: var(--primary);
    }
  }
}

@media screen and (max-width: 1024px) {
  .record-container {
    width: 100%;
  }
}
</style>
