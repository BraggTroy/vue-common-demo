<template>
  <div class="container">
    <h4>黑鲨表格组件使用</h4>
    <div>
      <SharkTable :search="search" action="/api/article?status=2"></SharkTable>
    </div>
  </div>
</template>

<script>
  import SharkTable from '@/components/shark-table'
  export default {
    name: '',
    components: {SharkTable},
    data () {
      return {
        search: [
          {key: 'title', type: 'input', placeholder: '请输入标题'},
          {key: 'model', type: 'select', placeholder: '请选择机型', options: [
              {label: '黑鲨1', value: 'SKR-A0'},
              {label: '黑鲨 Helo', value: 'AWM-A0'},
              {label: '黑鲨2', value: 'SKW-A0'},
              {label: '黑鲨DLK', value: 'DLK-A0'}
            ]},
        ],
      }
    },
    mounted () {
      this.$http({
        method: 'get',
        url: '/vuedemo/getuserinfo'
      })
    },
    methods: {}
  }
</script>

<style scoped lang="less">
.container{
  padding: 15px;
}
</style>
