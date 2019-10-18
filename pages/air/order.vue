<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm @handleData="handleData" @totalPrice="totalPrice"/>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :allPrice="allPrice"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
  data() {
    return {
      infoData: {
        seat_infos:{}
      },
      allPrice:0
    };
  },
  components: {
    OrderForm,
    OrderAside
  },
  methods: {
    handleData(data) {
      this.infoData = data;
    },
    totalPrice(price){
      this.allPrice = price;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>