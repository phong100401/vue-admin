<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
    <a-form-item label="Product Name">
      <a-input v-model="form.name"/>
      <span id="error-name" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Price">
      <a-input v-model="form.price"/>
      <span id="error-price" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Category">
      <a-select v-model="form.categoryId">
        <a-select-option v-for="item in data" :key="item.id" :value="item.id">
          {{item.name}}
        </a-select-option>
      </a-select>
      <span id="error-category" style="color:red;"></span>
    </a-form-item>
    <a-form-item label="Description" >
      <a-input v-model="form.description" />
      <span id="error-description" style="color:red;"></span>
    </a-form-item>
    <a-form-item label="Quantity">
      <a-input v-model="form.quantity"/>
      <span id="error-quantity" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Thumbnail">
      <a-input v-model="form.thumbnail"/>
      <span id="error-thumbnail" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Status" hidden>
      <a-input v-model="form.status"/>
    </a-form-item>
    <a-form-item style="height: auto" label="Detail">
      <ckeditor :editor="editor" v-model="form.detail"  :config="editorConfig"></ckeditor>
    </a-form-item>
    <span id="error-detail" style="color: red"></span>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" @click.stop.prevent="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import CategoryService from "@/service/CategoryService";
import ProductService from "@/service/ProductService";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//đây là class upload
class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file
        .then( file => new Promise( ( resolve, reject ) => {
          this._initRequest();
          this._initListeners( resolve, reject, file );
          this._sendRequest( file );
        } ) );
  }

  // Aborts the upload process.
  abort() {
    if ( this.xhr ) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open( 'POST', '<url here>', true );
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners( resolve, reject, file ) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${ file.name }.`;

    xhr.addEventListener( 'error', () => reject( genericErrorText ) );
    xhr.addEventListener( 'abort', () => reject() );
    xhr.addEventListener( 'load', () => {
      const response = xhr.response;

      if ( !response || response.error ) {
        return reject( response && response.error ? response.error.message : genericErrorText );
      }

      resolve( {
        default: response.url
      } );
    } );

    if ( xhr.upload ) {
      xhr.upload.addEventListener( 'progress', evt => {
        if ( evt.lengthComputable ) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      } );
    }
  }

  // Prepares the data and sends the request.
  _sendRequest( file ) {
    // Prepare the form data.
    const data = new FormData();

    data.append( 'upload', file );

    // Send the request.
    this.xhr.send( data );
  }
}

export default{
  data() {
    return {
      data:[],
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo' ],
        table: {
          toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
        extraPlugins: [this.uploader],
        language: 'nl',
      },
      form:{
        name: undefined,
        price: undefined,
        thumbnail: undefined,
        categoryId: undefined,
        quantity: undefined,
        detail: undefined,
        description: undefined,
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
    uploader(editor)
    {
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new UploadAdapter( loader );
      };
    },
    validate(){
      var errorName = document.getElementById('error-name')
      var errorPrice = document.getElementById('error-price')
      var errorCategory = document.getElementById('error-category')
      var errorDescription = document.getElementById('error-description')
      var errorQuantity = document.getElementById('error-quantity')
      var errorThumbnail = document.getElementById('error-thumbnail')
      var errorDetail = document.getElementById('error-detail')
      // eslint-disable-next-line no-unused-vars
      var number = 0
      if(this.form.name === undefined){
        errorName.innerText = 'Vui lòng nhập tên sản phẩm'
        number++
      }else {
        errorName.innerText = ''
      }
      if (this.form.price === undefined){
        errorPrice.innerText = 'Vui lòng nhập giá tên lớn hơn 0'
        number++
      }else {
        errorPrice.innerText = ''
      }
      if(this.form.categoryId === undefined){
        errorCategory.innerText = 'Vui lòng chọn category'
        number++
      }else {
        errorCategory.innerText = ''
      }
      if(this.form.description === undefined){
        errorDescription.innerText = 'Vui lòng nhập mô tả sản phẩm'
        number++
      }else{
        errorDescription.innerText = ''
      }
      if(this.form.quantity === undefined){
        errorQuantity.innerText = 'Vui lòng nhập số lương sản phẩm lớn hơn 0'
        number++
      }else {
        errorQuantity.innerText = ''
      }
      if(this.form.thumbnail === undefined){
        errorThumbnail.innerText = 'Vui lòng cho ảnh sản phẩm'
        number++
      }else {
        errorThumbnail.innerText = ''
      }
      if(this.form.detail === undefined){
        errorDetail.innerText = 'Vui lòng nhập chi tiết sản phẩm'
        number++
      }else {
        errorDetail.innerText = ''
      }
      if (number === 0) return true;
      return false;
    },
    handleSubmit(e){
      e.preventDefault()
      if(!this.validate()){
        return 
      }
      ProductService.save(this.form).then(
          this.$router.push("/products/list")
      ).catch(error => {
        console.log(error)
      })
    }
  },
};

</script>

<style scoped>

</style>