<template>
  <div class="home">
    <div class="row gx-4 gx-lg-5">
      <div class="col-md-4 text-center">
        <div class="mt-5">
          <div class="mb-2"><img src="https://picsum.photos/100" alt="" /></div>
          <h3 class="h4 mb-2">Sturdy Themes</h3>
          <p class="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="mt-5">
          <div class="mb-2"><img src="https://picsum.photos/100" alt="" /></div>
          <h3 class="h4 mb-2">Up to Date</h3>
          <p class="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="mt-5">
          <div class="mb-2"><img src="https://picsum.photos/100" alt="" /></div>
          <h3 class="h4 mb-2">Ready to Publish</h3>
          <p class="text-muted mb-0">You can use this design as is, or you can make changes!</p>
        </div>
      </div>
    </div>
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
