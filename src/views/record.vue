<template>
  <div class="record-layer linear-bg-color">
    <div class="flex items-center justify-between md:mb-8 mb-4 select-none">
      <router-link to="/" class="cursor-pointer">
        <img class="logo-w" src="@/assets/images/logo-w.png" alt="楊梅開基玉玄宮" />
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
          <TableColumn prop="created_at" label="點燈日期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at.split('T')[0]}}</span>
            </template>
          </TableColumn>
          <TableColumn prop="type_name" label="燈種" align="center"></TableColumn>
          <TableColumn label="金額" align="center">
            <template slot-scope="scope">
              <span>${{ scope.row.price }}</span>
            </template>
          </TableColumn>
          <TableColumn prop="payment_state" label="狀態" align="center">
            <template slot-scope="scope">
              <span>{{ getPaymentStatus(scope.row.payment_state) }}</span>
            </template>
          </TableColumn>
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
// import Tools from '@/utils/tools.js'
import Publish from '@/api/publish.js'

export default {
  name: 'Record',
  components: { Table, TableColumn, Pagination, Dialog, OrderDetail },
  data () {
    return {
      pageTotal: 1,
      tableData: [],
      dialogVisible: false,
      order: {}
    }
  },
  computed: {
    phone () {
      return this.$store.state.userInfo.phoneNumber
    }
  },
  created () {
    this.getRecord()
  },
  methods: {
    async getRecord () {
      const res = await Publish.fetchCandleRecord(this.phone)
      console.log(res)
      this.tableData = res
    },
    getPaymentStatus (status) {
      switch (status) {
        case 'paid':
          return '已付款'
        case 'unpaid':
          return '尚未付款'
        case 'unverified':
          return '審核中'
        default:
          break
      }
    },
    openDetail (order) {
      this.order = order
      this.dialogVisible = true
    },
    logout () {
      this.$store.dispatch('logout')
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
