<template>
  <div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :datasrc="data">
      <a-form-item label="Product Name">
        <a-input style="color: black" disabled v-model="data.name"/>
      </a-form-item>
    </a-form>
    <a-button type="primary" html-type="submit" @click="backBtn()">
      Back
    </a-button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryService from "../../../service/CategoryService";
export default {
  data() {
    return {
      data: {},
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      params: undefined,
      form:{
        name: undefined,
      }
    }
  },
  created() {
    this.params = this.$router.currentRoute.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      CategoryService.detail(this.params).then(
          res => {
            this.data = res.data
            this.editorData = res.data.detail
          }
      )
    },
    backBtn(){
      this.$router.push("/categories/list")
    }
  }
}
</script>

<style scoped>

</style>