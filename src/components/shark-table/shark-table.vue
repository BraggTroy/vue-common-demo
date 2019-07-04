<template>
  <!--
  该组件，封装表格和分页的关联操作。无需考虑分页，组件自动实现
  表格需要手动实现，查询的数据返回
  -->
  <div class="table-box">
    <slot name="search">
      <Row class="search-bar" :gutter="15" style="margin-bottom: 15px;">
        <i-col :span="5" v-for="s in search">
          <Input v-if="!s.type || s.type === 'input'" v-model="defaultSearch[s.key]" :placeholder="s.placeholder" clearable></Input>

          <Select v-if="s.type === 'select'" v-model="defaultSearch[s.key]" :placeholder="s.placeholder" clearable :multiple="!!s.multiple">
            <Option v-for="o in s.options" :value="o.value">{{o.label}}</Option>
          </Select>
        </i-col>
        <Button @click="queryData()" type="primary">查询</Button>
      </Row>
    </slot>

    <!--默认插槽，显示表格主体，表格纯手打-->
    <!--当不自定义表格的时候，则根据接口返回的数据，自动生成-->
    <slot>
      <Table :columns="defaultColumns" :data="defaultData" class="table" style="margin-bottom: 15px;"></Table>
    </slot>

    <Page :total="total" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="[10, 20, 50, 100]"
          @on-change="pageChange" @on-page-size-change="pageSizeChange"  size="small" show-total show-elevator show-sizer/>

  </div>
</template>

<script>
  /* props
  * action：查询的表格数据的url，通常为api加上查询字符串，
  * method: 默认为get方法，
  * page：可选，直接加载第page页的数据
  */
  /* emit
  * @on-success：接口请求结束后回调，将res返回,
  * */
  export default {
    name: "shark-table",
    components: {},
    props: {
      action: {
        type: String,
        default: '/'
      },
      method: {
        type: String,
        default: 'get'
      },
      page: {
        type: Number
      },
      search: {
        type: Array,
        default: () => {return []}
      }
    },
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        actionPath: null,

        defaultSearch: {},
        searchQuery: '',
        defaultColumns: [],
        defaultData: []

      }
    },
    computed: {
      url () {
        return this.actionPath + `&page=${this.currentPage}&limit=${this.pageSize}` + this.searchQuery
      }
    },
    watch: {
      action () {
        this.actionPath = this.action
      },
      url () {
        this.getTableList()
      },
      page () {
        this.currentPage = this.page
        this.getTableList()
      }
    },
    mounted () {
      if (this.page) {
        this.currentPage = this.page
      }
      this.actionPath = this.action
    },
    methods: {
      getTableList () {
        if (!this.actionPath) {
          return false
        } else {
          this.ajax({
            method: this.method,
            url: this.url,
            success: (res) => {
              this.total = res.Count
              // 防止删除正好当前页删完了，当时page没有主动触发，导致page和total不同步
              if (res.Count > 0 && !res.Data) {
                this.currentPage = this.currentPage - 1 || 1
              } else {
                this.$emit('on-success', res)
              }
              // 处理默认的表格数据
              if (res.Code === 0) {
                if (!this.$slots.default) {
                  let result = res.Data || []
                  this.defaultColumns = this.getColumnsItem(result[0])
                  this.defaultData = result
                }
              }
            }
          })
        }
      },
      getTableListDefault () {
        if (!this.actionPath) {
          return false
        } else {
          this.$http({
            method: this.method,
            url: this.url
          }).then(res => {
            this.total = res.data.Count
            // 防止删除正好当前页删完了，当时page没有主动触发，导致page和total不同步
            if (res.data.Count > 0 && !res.data.Data) {
              this.currentPage = this.currentPage - 1 || 1
            } else {
              this.$emit('on-success', res)
            }
            // 处理默认的表格数据
            if (res.data.Code === 0) {
              if (!this.$slots.default) {
                let result = res.data.Data || []
                this.defaultColumns = this.getColumnsItem(result[0])
                this.defaultData = result
              }
            }
          })
        }
      },

      getColumnsItem (object) {
        object = object || {}
        let columns = []
        for (let key in object) {
          if (key !== 'Created' && key !== 'Updated'){
            columns.push({
              'title': key,
              'key': key,
              tooltip: true
            })
          }
        }
        return columns
      },

      queryData () {
        let query = ''
        for (let key in this.defaultSearch) {
          query = query +'&' + key + '=' + this.defaultSearch[key]
        }
        this.searchQuery = query
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
