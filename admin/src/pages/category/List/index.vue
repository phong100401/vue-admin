<template>
  <div>
    <a-card>
      <div style="padding-bottom: 20px; padding-top: 20px">
        <router-link to="/categories/create">
          <a-button type="primary" icon="plus">
            Add category
          </a-button>
        </router-link>
      </div>
      <a-table :columns="columns" :pagination="false" rowKey="id" :data-source="data">
         <span slot="category" slot-scope="text">
           {{ text.name }}
         </span>
        <span slot="thumbnail" slot-scope="text">
             <img :src="text" style="width: 70%">
         </span>
        <div slot="action" slot-scope="text,record">
          <a class="button" @click="showDeleteConfirm(record.id)">
            <a-icon style="font-size: 25px" type="delete"/>
          </a> |
          <a class="button" :href="'/categories/edit/'+ record.id ">
            <a-icon style="font-size: 25px" type="edit"/>
          </a> |
          <a class="button" :href="'/categories/detail/'+ record.id ">
            <a-icon style="font-size: 25px" type="info-circle"/>
          </a>
        </div>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import CategoryService from "@/service/CategoryService";
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Category Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    scopedSlots: {customRender: 'action'},
  }

];
export default {
  data() {
    return {
      data: [],
      form: {
        id: undefined,
        name: 1
      },
      columns,
      body:{
        id:undefined,
        name: 1
      },
    };
  },
  created() {
    this.getCategorise()
  },
  methods: {
    getCategorise() {
      CategoryService.getAll(this.params).then(
          rs => {
            this.data = rs.data;
          }
      )
    },
    onShowSizeChange(current, pageSize) {
      this.params.pageSize = pageSize;
      this.params.page = current;
      this.getCategorise();
    },
    onChange(page, limit) {
      this.params.page = page;
      this.params.pageSize = limit;
      this.getCategorise();
    },
    showDeleteConfirm(pId) {
      this.$confirm({
        title: 'Do you want delete this category',
        onOk: () => {
          this.deleteCategory(pId)
        },
        onCancel() {
          console.log("Cancel")
        }
      })
    },
    deleteCategory(pId) {
      CategoryService.delete(pId);
      this.getCategorise();
      window.location.reload()
    },
  }
};
</script>

<style scoped>

</style>