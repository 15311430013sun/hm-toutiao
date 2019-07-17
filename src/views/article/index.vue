<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态 ：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间 ：">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="changeDate"
              v-model="dateValues"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy style="width: 100px; height: 100px" :src="scope.row.cover.images[0]">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt width="100" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                plain
                @click="del(scope.row.id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        // 开始时间和结束时间都为空白
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道数据
      channelOptions: [],
      // 日期控件的数据
      dateValues: [],
      // 列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
    // 获取列表数据
    this.getArticles()
  },
  methods: {
    // 编辑按钮跳转
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确定，发送删除请求
        await this.$axios.delete(`/`)
        // 获取列表数据
        this.getArticles()
        // 提示信息
        this.$message.success('删除成功')
      }).catch(() => {
        // 取消

      })
    },
    // current-change页码切换时触发的事件
    changePager (newPage) {
    // 跟新提交给后台的参数
      this.reqParams.page = newPage
      // 获取列表数据
      this.getArticles()
    },
    // 筛选
    search () {
    // 重新获取列表数据
      this.getArticles()
    },
    // 筛选时间
    changeDate (value) {
    // 给begin 和end 赋值
      this.reqParams.begin_pubdate = value[0]
      this.reqParams.end_pubdate = value[1]
    },

    // 获取频道数据
    async getChannelOptions () {
      const res = await this.$axios.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/channels'
      )
      const data = res.data.data
      console.log(data)
      this.channelOptions = data.channels
    },
    // 获取列表数据
    async getArticles () {
      const res = await this.$axios.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/articles',
        { params: this.reqParams }
      )
      const data = res.data.data
      // 列表数据
      this.articles = data.results
      console.log(data.results)
      // 文章总数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
.box {
  text-align: center;
  margin-top: 30px;
}
</style>
