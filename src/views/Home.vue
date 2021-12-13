<template>
  <div class="home">
    <ul class="flex align-middle justify-between">
      <li class="flex flex-col align-middle justify-center">
        <img src="https://picsum.photos/100" alt="" />
        <h3 class="h4 mb-2">Sturdy Themes</h3>
        <p class="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
      </li>
    </ul>
    <el-button type="primary">我是按鈕</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit () {},
    onReset () {}
  }
}
</script>
