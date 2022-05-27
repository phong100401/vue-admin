<template>
  <div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :datasrc="form">
      <a-form-item label="Product Name">
        <a-input v-model="form.name"/>
      </a-form-item>
      <a-form-item label="Category">
        <a-select v-model="form.categoryId">
          <a-select-option v-for="item in categories" :key="item.id" :value="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Price">
        <a-input v-model="form.price"/>
      </a-form-item>
      <a-form-item label="Quantity">
        <a-input v-model="form.quantity"/>
      </a-form-item>
      <a-form-item label="Thumbnail">
        <a-input v-model="form.thumbnail"/>
      </a-form-item>
      <a-form-item label="Description">
        <a-input v-model="form.description"/>
      </a-form-item>
      <a-form-item label="Detail">
        <ckeditor :editor="editor" v-model="form.detail" :config="editorConfig"></ckeditor>
      </a-form-item>
    </a-form>
    <a-button type="primary" html-type="submit" @click="editProduct">
      Change
    </a-button>
  </div>
</template>

<script>
import ProductService from "@/service/ProductService";
import CategoryService from "@/service/CategoryService";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      categories:[],
      params: undefined,
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      form:{
        name: undefined,
        price: undefined,
        quantity: undefined,
        thumbnail: undefined,
        categoryId: undefined,
        description: undefined,
        detail: undefined
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
      ProductService.detail(this.params).then(
          res => {
            this.form = res.data
            this.editorData = res.data.detail
          }
      )
    },
    editProduct(){
      ProductService.edit(this.params,this.form).then(
          () =>{
            this.$router.push("/products/list")
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