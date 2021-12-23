<template>
  <div>Detail</div>
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
