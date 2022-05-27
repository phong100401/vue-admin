<template>
  <div>
    <a-card>
      <a-table :columns="columns" :pagination="false" rowKey="id" :data-source="data">
         <span slot="order" slot-scope="text">
           {{ text.name }}
         </span>
<!--        <span slot="thumbnail" slot-scope="text">-->
<!--             <img :src="text" style="width: 70%">-->
<!--         </span>-->
<!--        <div slot="action" slot-scope="text,record">-->
<!--          <a class="button" @click="showDeleteConfirm(record.id)">-->
<!--            <a-icon style="font-size: 25px" type="delete"/>-->
<!--          </a>-->
<!--        </div>-->
      </a-table>
    </a-card>
  </div>
</template>

<script>
import OrderService from "../../../service/OrderService";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Ship Name',
    dataIndex: 'shipName',
    key: 'shipName',
  },
  {
    title: 'Ship Address',
    dataIndex: 'shipAddress',
    key: 'shipAddress',
  },
  {
    title: 'Ship Note',
    dataIndex: 'shipNote',
    key: 'shipNote',
  },
  {
    title: 'Ship Phone',
    dataIndex: 'shipPhone',
    key: 'shipPhone',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
  {
    title: 'OrderStatus',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    ellipsis: true,
  },
  {
    title: 'CheckOut',
    dataIndex: 'checkout',
    key: 'checkout',
    ellipsis: true,
  }
];
export default {
  data(){
    return{
      data:[],
      form: {
        id: undefined,

      },
      columns,
      body:{
        id: undefined,

      },
    };
  },
  created() {
    this.getOrder()
  },
  methods:{
    getOrder(){
      OrderService.getAll(this.params).then(
          rs => {
            console.log(rs.data.data)
            this.data = rs.data.data;
          }
      )
    }
  }
}
</script>

<style scoped>

</style>