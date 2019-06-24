<template>
  <div class="container">
    <!--测试-->
    <SharkTable action="/api/article?status=2" :search="search" @on-success="onArticleSuccess">
      <Table :data="articleList" :columns="articleColumn" class="table">
        <template slot="Title" slot-scope="{row, index}">
          <a @click="showDetail(row)">{{row.Title}}</a>
        </template>
        <template slot="Status" slot-scope="{row, index}">
          <span class="color-success" v-if="row.Status">是</span>
          <span v-else class="color-error">否</span>
        </template>
        <template slot="opt" slot-scope="{row, index}">
          <Button @click="editArticle(row)" size="small" type="primary" class="table-opt">编辑</Button>
          <Button @click="deleteArticle(row)" size="small" type="error" class="table-opt">删除</Button>
        </template>
      </Table>
    </SharkTable>

  </div>
</template>

<script>
  import SharkTable from '_c/shark-table'
  export default {
    name: "",
    components: {SharkTable},
    data() {
      return {
        tab: 1,  // 1:article  2:guide  (info)

        articlePage: null,
        guidePage: null,

        search: [
          {key: 'title', type: 'input', placeholder: '请输入标题'},
          {key: 'model', type: 'select', placeholder: '请选择机型', options: [
              {label: '黑鲨1', value: 'SKR-A0'},
              {label: '黑鲨 Helo', value: 'AWM-A0'},
              {label: '黑鲨2', value: 'SKW-A0'},
              {label: '黑鲨DLK', value: 'DLK-A0'}
            ]},
        ],
        articleList: [],
        articleColumn: [
          {title: '标题', slot: 'Title', minWidth: 120},
          {title: '副标题', key: 'SubTitle', minWidth: 120},
          {title: '备注信息', key: 'Comment', minWidth: 120},
          {title: '启用状态', slot: 'Status', width: 100},
          {title: '操作', slot: 'opt', width: 130, align: 'center', fixed: 'right'}
        ],
      }
    },
    mounted() {
      let params = this.$route.query
      // console.log(params)
      this.tabChange(params.tab || 1)
    },
    methods: {
      tabChange (tab) {
        this.tab = tab || 1
        if (this.tab == 1) {
          this.articlePage = this.$route.query.page || 1
        } else if (this.tab == 2) {
          this.guidePage = this.$route.query.page || 1
        } else {
          this.articlePage = 1
          this.guidePage = 1
        }
      },

      onArticleSuccess (res) {
        if (res.data.Code === 0) {
          this.articleList = res.data.Data || []
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .tabs-box{
    margin-bottom: 20px;
    .tab{
      cursor: pointer;
      line-height: 40px;
      width: 100%;
      background: #f7f9ff;
      font-size: 14px;
      text-align: center;
      i {
        font-size: 16px;
      }
    }
    .active {
      color: #fff;
      background: #2d8cf0;
    }
  }
</style>
