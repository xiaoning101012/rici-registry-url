<!--  -->
<template>
  <div class="ConditionalSelection">
    <div class="selectaddress">
      <div class="addresslevel">
        <div class="addresslevel_name">政策层级：</div>
        <div class="level_names" @click="choosearea">
          <div
            class="name"
            :class="{ active: areaindex == index }"
            v-for="(item, index) in choosedata.area"
            :data-index="index"
            :data-area="item.id"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- <div class="addresslevel">
        <div class="addresslevel_name">政策层级：</div>
        <div class="level_names level_sx" @click="choosearea">
          <div
            class="name"
            :class="{ active: urbanindex == index }"
            v-for="(item, index) in choosedata.area"
            :data-index="index"
            :data-urban="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </div> -->
      <div class="addresslevel" v-if="areaindex == 3">
        <div class="addresslevel_name">市(州)选择：</div>
        <div class="level_names level_sx" @click="choosearea">
          <div
            class="name"
            :class="{ active: urbanindex == index }"
            v-for="(item, index) in choosedata.urban"
            :data-index="index"
            :data-urban="item.id"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="addresslevel" v-if="areaindex == 2">
        <div class="addresslevel_name">部门选择：</div>
        <div class="level_names level_sx bordernone" v-loading="loading">
          <div
            class="name bumen"
            :class="{ active: deptindex == index }"
            :key="index"
            v-for="(item, index) in togglestatus == 0
              ? choosedata.dept.slice(0, 15)
              : choosedata.dept"
            :data-index="index"
            :data-dept="item.id"
            @click="deptClick(item, index)"
          >
            <el-tooltip
              :content="item.departName"
              v-if="item.departName.length > 9"
              placement="bottom"
              effect="light"
            >
              <div class="deptName">{{ item.departName }}</div>
            </el-tooltip>
            <div v-else class="deptName">{{ item.departName }}</div>
            <!-- <a :title="item.name">{{item.name}}</a> -->
            <!-- <template">
              {{item.name}}
            </template> -->
          </div>
          <div
            v-if="choosedata.dept.length >= 14"
            class="name toggle"
            @click="togglef"
          >
            <img
              :class="togglestatus == 0 ? 'tanslate' : 'tanslate0'"
              src="@/assets/hq_zc_pipei/jiantou.png"
            />
            {{ toggletext }}
          </div>
        </div>
      </div>
      <div v-if="qlfcshow" class="addresslevel">
        <div class="addresslevel_name">政策类别：</div>
        <div class="level_names level_sx" @click="choosearea">
          <div
            class="name"
            :class="{ active: qlfcindex == index }"
            v-for="(item, index) in choosedata.qlfc"
            :data-index="index"
            :data-qlfc="item.id"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <!-- <div class="search_box">
      <el-input v-model="searchkey" placeholder="请输入关键字查询"></el-input>
      <div class="search_btn" @click="search">搜 &nbsp;索</div>
    </div> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //组件接收参数
  props: {
    choosedata: {
      type: Object,
    },
    qlfcshow: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 条件选中索引
      areaindex: 0,
      urbanindex: 0,
      qlfcindex: 0,
      deptindex: 0,
      // 搜索关键字
      searchkey: "",
      togglestatus: 0,
      toggletext: "更多",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 地区条件选择
    choosearea(e) {
      console.log(e);
      // console.log(e.target.dataset)
      if (e.target.dataset.area) {
        console.log("e.target.dataset.area", e.target.dataset.area);
        if (e.target.dataset.area != "1") {
          this.urbanindex = 0;
        }
        if (e.target.dataset.area == "5110000000000") {
          this.deptindex = 0;
        }
        this.areaindex = e.target.dataset.index;
        this.$emit("choosearea", {
          type: "deptName",
          value: e.target.dataset.area,
        });
      }
      if (e.target.dataset.urban) {
        this.urbanindex = e.target.dataset.index;
        this.$emit("choosearea", {
          type: "deptName2",
          value: e.target.dataset.urban,
        });
      }
      if (e.target.dataset.qlfc) {
        this.qlfcindex = e.target.dataset.index;
        this.$emit("choosearea", {
          type: "nature",
          value: e.target.dataset.qlfc,
        });
      }
      // if (e.target.dataset.dept) {
      //   this.deptindex = e.target.dataset.index
      //   this.$emit("choosearea", {
      //     type: "departmentName",
      //     value: e.target.dataset.dept
      //   });
      // }
    },
    // 点击部门
    deptClick(item, index) {
      // console.log(item)
      // console.log(index)
      this.deptindex = index;
      this.$emit("choosearea", {
        type: "departmentName",
        value: item.id,
      });
    },
    // 搜索
    search() {
      this.$emit("search", this.searchkey);
    },
    togglef() {
      if (this.togglestatus == 0) {
        this.togglestatus = 1;
        this.toggletext = "收起";
      } else {
        this.togglestatus = 0;
        this.toggletext = "更多";
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.ConditionalSelection {
  overflow: hidden;
}

.active {
  color: #2055c9 !important;
  background: rgba(32, 85, 201, 0.1);
  border-radius: 5px;
}

.selectaddress {
  // padding-right: 36px;

  .addresslevel {
    display: flex;

    .addresslevel_name {
      margin: 15px 17px 0 0;
      margin-right: 17px;
      // width: 113px;
      font-size: 16px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: #333333;
      line-height: 24px;
      text-align: right;
    }

    .level_names {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      padding: 10px 0;
      min-height: 53px;
      border-bottom: 1px solid #eeeeee;

      &.bordernone {
        border-bottom: none;
      }

      &.level_sx {
        .name {
          margin: 2px 0px 5px 0;
        }
      }

      .name {
        cursor: pointer;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #333333;
        padding: 6px 21px;
        // height: 32px;
        // line-height: 32px;

        .deptName {
          // margin: 5px 20px 5px 0;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          // color: #333333;
          line-height: 22px;
          cursor: pointer;
          transition: 0.5s linear;

          &:hover {
            // color: #1f59d8;
          }
        }
      }

      .bumen {
        // margin-right: 26px !important;

        .deptName {
          max-width: 145px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 0;
          // text-align: center;
        }
      }

      .toggle {
        display: flex;
        align-items: center;
        color: #2b62da;
        cursor: pointer;

        img {
          width: 16px;
        }
      }
    }
  }
}

.tanslate0 {
  transition: 0.3s linear;
  transform: translate(0);
}

.tanslate {
  transition: 0.3s linear;
  transform: rotate(180deg);
}

.search_box {
  float: right;
  display: flex;
  margin: 9px 0 21px 0;
  width: 438px;

  /deep/ .el-input {
    flex: 1;
  }

  /deep/ .el-input__inner {
    padding-left: 10px;
    height: 38px;
    background-color: #f8f8f8;
    border-color: #f8f8f8;
    border-radius: 0;

    &::-webkit-input-placeholder {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #cfcfcf;
    }
  }

  .search_btn {
    width: 77px;
    height: 38px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
    line-height: 38px;
    text-align: center;
    background: #1f59d8;
    cursor: pointer;
  }
}
</style>