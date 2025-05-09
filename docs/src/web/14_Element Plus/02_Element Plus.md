# 1、Table组件

- 基础用法：`<el-table></el-table>`
  - `<el-table-column>` 有几列则写几个
  - `prop` 属性来对应对象中的键名即可填入数据
  - `label` 属性来定义表格的列名字

```html
<script setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <el-table :data="tableData">
     <!--prop绑定数据，label是列名-->
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="住址"  />
  </el-table>
</template>

<style scoped>

</style>
```





- 带斑马纹表格:给标签加`stripe` 属性:`<el-table stripe></el-table>`
- 带边框表格: 给标签加`border` 属性: `<el-table border></el-table>` 

- 固定表头:给标签加`height` 属性:`<el-table height="250"></el-table>`

> 表格部分内容较多,推荐按照官网进行阅读



































