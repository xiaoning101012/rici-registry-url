<template>
  <div>
    <el-dialog title="完善单位信息" :visible.sync="dialogVisible" width="660px" center :before-close="handleClose">
      <div class="titleOne">
        <div><img :src="img" alt="" /></div>
        <div class="titleone_1">{{ searchMap.entname }}</div>
      </div>
      <div class="contents">
        <!-- 所属区划 -->
        <div class="content">
          <div class="title">所属区划</div>
          <div>
            <el-radio-group v-model="division">
              <el-radio-button v-for="item in choosedata" :key="item.id" :label="item.id">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 企业规模 -->
        <div class="content">
          <div class="title">企业规模</div>
          <div>
            <el-radio-group v-model="enterprise">
              <el-radio-button v-for="(item, index) in enterpriseSize" :key="index"
                :label="item.id">{{ item.tagName }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 行业类别 -->
        <div class="content">
          <div class="title">行业类别</div>
          <div>
            <el-checkbox-group v-model="industry">
              <el-checkbox-button v-for="(city, index) in industryType" :label="city.id" :key="index">{{ city.tagName
              }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <!-- 企业性质 -->
        <div class="content">
          <div class="title">企业性质</div>
          <div>
            <el-radio-group v-model="nature">
              <el-radio-button v-for="(item, index) in enterpriseNature" :key="index" :label="item.id">{{ item.tagName
              }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 企业资质 -->
        <div class="content">
          <div class="title">企业资质</div>
          <div class="qyzz">
            <el-checkbox-group v-model="qualifications">
              <el-checkbox-button v-for="(item, index) in enterpriseQualification" :key="index" :label="item.id">
                <el-popover placement="right" title="惠企百科：" width="200" popper-class="jqbk" trigger="hover"
                  :content="item.explain">
                  <div slot="reference">{{ item.tagName }}</div>
                </el-popover>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div>为了匹配更适合您的政策，请花几分钟完善单位信息</div>
        <el-button type="primary" @click="matching">精准匹配</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { companyTag, updatecompanytag, getNatureQuyu } from "./api";
export default {
  data () {
    return {
      dialogVisible: false,
      img: require("@/assets/hq_zc_pipei/titles.png"),
      division: "", // 所属区划
      enterprise: "", // 企业规模
      industry: [], // 行业类别
      nature: "", //企业性质
      qualifications: [], // 企业资质
      // 企业规模
      enterpriseSize: [],
      // 企业资质
      enterpriseQualification: [],
      // 企业性质
      enterpriseNature: [],
      // 	行业类别
      industryType: [],
      choosedata: [],
      searchMap: {},
      Ts: false
    };
  },
  created () {
    this.listD();
    this.getNature_quyu()
  },
  methods: {
    // 获取区域
    async getNature_quyu () {
      let urban = await getNatureQuyu({ province: 81, parentId: 81 })
      this.choosedata = urban.result.map(item => {
        return { id: item.areaCode, name: item.areaName }
      })
    },
    // 精准匹配
    matching () {
      if (this.division && this.enterprise && this.nature && this.industry.length !== 0) {
        const arr = {
          "addressCode": this.division,
          "companyId": this.searchMap.id,
          "companyTagRelationList": [
            {
              "companyId": this.searchMap.id,
              "companyTagId": this.division
            },
            {
              "companyId": this.searchMap.id,
              "companyTagId": this.enterprise
            },
            {
              "companyId": this.searchMap.id,
              "companyTagId": this.nature
            },
          ]
        }
        const itemDls = []
        this.industry.forEach(item => {
          arr.companyTagRelationList.push({
            "companyId": this.searchMap.id,
            "companyTagId": item
          })
          itemDls.push(item)
        })
        this.qualifications.forEach(item => {
          arr.companyTagRelationList.push({
            "companyId": this.searchMap.id,
            "companyTagId": item
          })
          itemDls.push(item)
        })
        const DLone = this.enterprise + ',' + this.nature + ',' + itemDls.join(',')
        localStorage.setItem('DLone', DLone)
        if (this.$store.state.userInfo.type) {
          updatecompanytag(arr).then(res => {
            if (res.code === 200) {
              if (this.Ts) {
                this.dialogVisible = false;
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$emit('success', true)
              } else {
                this.dialogVisible = false;
                const { href } = this.$router.resolve({
                  path: "/policyMatching",
                  query: {
                    entname: this.searchMap.entname,
                    uniscid: this.searchMap.uniscid,
                    addressCode: this.division,
                    id: this.searchMap.id,
                    isActive: true
                  },
                });
                window.open(href, '_blank');
                // let xq_url = `/sc-zqsk-pc/#/policyMatching?entname=${this.searchMap.entname}&uniscid=${this.searchMap.uniscid}&addressCode=${this.division}&id=${this.searchMap.id}&isActive=true`
                // window.open(xq_url);
                // this.$router.push({
                //   path: "/hq_zc_pipei_result",
                //   query: {
                //     entname: this.searchMap.entname,
                //     uniscid: this.searchMap.uniscid,
                //     addressCode: this.searchMap.addressCode,
                //      companyId: this.searchMap.addressCode,
                //     id: this.searchMap.id,
                //     isActive: 'true',
                //   },
                // });
              }

            }
          })
        } else {
          this.dialogVisible = false;
          const { href } = this.$router.resolve({
            path: "/policyMatching",
            query: {
              entname: this.searchMap.entname,
              uniscid: this.searchMap.uniscid,
              addressCode: this.division,
              id: this.searchMap.id,
              isActive: true
            },
          });
          window.open(href, '_blank');
          // let xq_url = `/sc-zqsk-pc/#/policyMatching?entname=${this.searchMap.entname}&uniscid=${this.searchMap.uniscid}&addressCode=${this.division}&id=${this.searchMap.id}&isActive=true`
          // window.open(xq_url);
        }

      } else {
        const _that = this
        if (!_that.division) {
          _that.$message({
            message: '请选择所属区划！',
            type: 'warning'
          });
        } else if (!_that.enterprise) {
          _that.$message({
            message: '请选择企业规模！',
            type: 'warning'
          });
        } else if (_that.industry.length === 0) {
          _that.$message({
            message: '请选择行业类别！',
            type: 'warning'
          });
        } else if (!_that.nature) {
          _that.$message({
            message: '请选择企业性质！',
            type: 'warning'
          });
        }
      }
    },
    listD () {
      companyTag().then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.enterpriseSize = res.result.enterpriseSize;
          this.enterpriseQualification = res.result.enterpriseQualification;
          this.enterpriseNature = res.result.enterpriseNature;
          this.industryType = res.result.industryType;
        }
      });
    },
    dialog (arr) {
      this.division = "" // 所属区划
      this.enterprise = "" // 企业规模
      this.industry = [] // 行业类别
      this.nature = "" //企业性质
      this.qualifications = [] // 企业资质
      this.searchMap = arr
      this.dialogVisible = true;
    },
    // 编辑
    dialogEite (arr) {
      this.searchMap = arr
      this.Ts = true
      // this.division && this.enterprise && this.nature && this.industry
      if (arr.enterpriseSize) {
        this.division = arr.addressCode;
        const enterSize = arr.enterpriseSize.map(item => {
          return item.id
        });
        this.enterprise = enterSize.join('')
        const natureSting = arr.enterpriseNature.map(item => {
          return item.id
        })
        this.nature = natureSting.join('')
        // console.log(this.nature)
        this.industry = arr.industryType.map(item => {
          return item.id
        })
        this.qualifications = arr.enterpriseQualification.map(item => {
          return item.id
        })
        this.dialogVisible = true;
      } else {
        this.dialogVisible = true;
      }
    },
    handleClose (done) {
      done();
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog--center {
  .el-dialog__body {
    padding: 25px 30px 30px;
  }
}

.titleOne {
  height: 51px;
  background: #f4f5f9;
  border-radius: 5px 5px 5px 5px;
  opacity: 1;
  font-size: 20px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #2b57ec;
  line-height: 51px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    display: block;
    margin-left: 11px;
  }

  .titleone_1 {
    margin-left: 8px;
  }
}

.content {
  margin-top: 23px;

  .title {
    font-size: 18px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: 700;
    color: #3d3d3d;
    padding-bottom: 9px;
    border-bottom: 1px solid #d8d8d8;
  }

  ::v-deep .el-checkbox-button {
    margin-top: 10px;
    margin-right: 10px;
    overflow: hidden;
  }

  ::v-deep .el-checkbox-button__inner {
    border: 0;
    height: 42px;
  }

  ::v-deep .el-radio-button {
    margin-top: 10px;
    margin-right: 10px;
    overflow: hidden;
  }

  ::v-deep .el-radio-button__inner {
    border: 0;
    height: 42px;
  }

  ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: transparent;
    box-shadow: none;
    border: 0;
    border: 1px solid #2b57ecff !important;
    color: #2b57ecff;
    height: 42px;
    border-radius: 0;
    background: url("../../assets/hq_zc_pipei/hover.png") no-repeat right 18px;
    transition: none;
  }

  ::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background-color: transparent;
    box-shadow: none;
    border: 0;
    border: 1px solid #2b57ecff !important;
    color: #2b57ecff;
    height: 42px;
    border-radius: 0;
    background: url("../../assets/hq_zc_pipei/hover.png") no-repeat right 18px;
    transition: none;
  }
}

::v-deep .el-radio-button__inner {
  font-size: 16px;
  background: #f6f7f9;
}

::v-deep .el-checkbox-button__inner {
  font-size: 16px;
  background: #f6f7f9;
}

::v-deep .dialog-footer {
  display: flex;
  justify-content: space-between;
  height: 65px;
  background: #f4f5f9;
  border-radius: 0px 0px 5px 5px;
  align-items: center;
  padding: 0 11px;

  div {
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #86878a;
  }

  .el-button--primary {
    background-color: #2b57ec;
    border-color: #2b57ec;
  }
}

.jqbk {
  background-color: #2055c9cc;
}

.contents {
  height: 50vh;
  overflow-y: scroll;
  margin-top: 23px;
}

::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
  box-shadow: none;
}
</style>
