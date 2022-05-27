<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
    <a-form-item label="Category Name">
      <a-input v-model="form.name"/>
      <span id="error-name" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Status" hidden>
      <a-input v-model="form.status"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" @click.stop.prevent="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import CategoryService from "@/service/CategoryService";
export default {
  data() {
    return {
      data:[],
      form:{
        name: undefined,
        status: 'ACTIVE'
      }
    };
  },
  created() {
    this.getCategorise()
  },
  methods: {
    getCategorise(){
      CategoryService.getAll().then(
          res => {
            this.data = res.data
          }
      )
    },
    validate(){
      var errorName = document.getElementById('error-name')
      // eslint-disable-next-line no-unused-vars
      var number = 0
      if(this.form.name === undefined){
        errorName.innerText = 'Vui lòng nhập tên sản phẩm'
        number++
      }else {
        errorName.innerText = ''
      }
      if (number === 0) return true;
      return false;
    },
    handleSubmit(e){
      e.preventDefault()
      if(!this.validate()){
        return
      }
      CategoryService.save(this.form).then(
          this.$router.push("/categories/list")
      ).catch(error => {
        console.log(error)
      })
    }
  },
};

</script>

<style scoped>

</style>