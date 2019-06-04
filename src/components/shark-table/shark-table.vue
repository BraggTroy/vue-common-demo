<!--iview-->

<template>
  <!--
  该组件，封装表格和分页的关联操作。无需考虑分页，组件自动实现
  表格需要手动实现，查询的数据返回
  -->
  <div class="table-box">
    <slot name="header"></slot>

    <!--默认插槽，显示表格主体，表格纯手打-->
    <slot></slot>

    <Page :total="total" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="[10, 20, 50, 100]"
          @on-change="pageChange" @on-page-size-change="pageSizeChange"  size="small" show-total show-elevator show-sizer/>

  </div>
</template>

<script>
  /*
  * action：查询的表格数据的url，通常为api加上查询字符串，
  * method: 默认为get方法，
  * OnSuccess：接口请求结束后回调，将res返回,
  * page：可选，直接加载第page页的数据
  */
  export default {
    name: "shark-table",
    props: {
      action: {
        type: String,
        default: '/'
      },
      method: {
        type: String,
        default: 'get'
      },
      OnSuccess: {
        type: Function,
        default: function () {}
      },
      page: {
        type: Number
      }
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        actionPath: null
      }
    },
    computed: {
      url () {
        return this.actionPath + `&page=${this.currentPage}&limit=${this.pageSize}`
      }
    },
    watch: {
      action () {
        this.actionPath = this.action
      },
      url () {
        this.getTableList()
      }
    },
    mounted () {
      if (this.page) {
        this.currentPage = this.page
      }
    },
    methods: {
      getTableList () {
        this.$http({
          method: this.method,
          url: this.url
        }).then(res => {
          this.total = res.data.count
          this.OnSuccess(res)
        })
      },
      pageSizeChange (size) {
        this.pageSize = size
        this.getTableList()
      },
      pageChange (page) {
        this.currentPage = page
      }
    }
  }
</script>

<style scoped>

</style>
