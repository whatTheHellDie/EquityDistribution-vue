<template>
  <div class="table-list">
    <!-- pc -->
    <el-table border :data="data" v-if="$store.state.common.userAgent == 'pc'">
      <el-table-column v-for="(item,i) in head" :key="i" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
    <!-- phone -->
    <ul class="table-phone-list" v-else>
      <li v-for="(itemD,i) in data">
        <div class="div" v-for="(itemH,j) in head">
          <b>{{itemH.label}}：</b>
          <span>{{itemD[itemH.prop]}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['head', 'data']
};
</script>