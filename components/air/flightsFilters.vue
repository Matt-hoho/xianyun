<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.airport" placeholder="起飞机场">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.flightTimes" placeholder="起飞时间">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.company" placeholder="航空公司">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filters.airSize" placeholder="机型">
          <el-option
            :label="item.name"
            :value="item.size"
            v-for="(item,index) in planeSize"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        airport: "", // 机场
        flightTimes: "", // 出发时间
        company: "", // 航空公司
        airSize: "" // 机型大小
      },
      planeSize: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  props: {
    data: { type: Object, default: {} }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        // 统一实现四个条件的过滤
        var arr = this.data.flights.filter(v => {
          let valid = true;
          // 航空公司有选中值时候才判断
          if (this.filters.company && this.filters.company !== v.airline_name) {
            valid = false;
          }
          if (this.filters.airport && this.filters.airport !== v.org_airport_name) {
            valid = false;
          }
          // 时间
          if (this.filters.flightTimes) {
            // 出发时间的小时
            const start = +v.dep_time.split(":")[0]; 
            const arr = this.filters.flightTimes.split(",");
            // 不在选中的时间段内
            if (start < +arr[0] || start >= +arr[1]) {
              valid = false;
            }
          }
          if (this.filters.airSize && this.filters.airSize !== v.plane_size) {
            valid = false;
          }
          return valid;
        });
        this.$emit("setDataList", arr);
      }
    }
  },
  methods: {
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.filters.airport = "";
      this.filters.flightTimes = "";
      this.filters.company = "";
      this.filters.airSize = "";

      this.$emit("setDataList", this.data.flights);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>