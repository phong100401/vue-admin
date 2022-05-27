<template>
  <div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :datasrc="form">
      <a-form-item label="Product Name">
        <a-input v-model="form.name"/>
      </a-form-item>
    </a-form>
    <a-button type="primary" html-type="submit" @click="editProduct">
      Change
    </a-button>
  </div>
</template>

<script>
import CategoryService from "@/service/CategoryService";
export default {
  data() {
    return {
      categories:[],
      params: undefined,
      form:{
        name: undefined,
      }
    }
  },
  created() {
    this.params = this.$router.currentRoute.params.id
    this.getDetail()
    this.getCategorise()
  },
  methods: {
    getDetail() {
      CategoryService.detail(this.params).then(
          res => {
            this.form = res.data
            this.editorData = res.data.detail
          }
      )
    },
    editProduct(){
      CategoryService.edit(this.params,this.form).then(
          () =>{
            this.$router.push("/categories/list")
          }
      )
    },
    getCategorise() {
      CategoryService.getAll().then(
          res => {
            this.categories = res.data
          }
      )
    }
  }
}
</script>

<style scoped>
</style>