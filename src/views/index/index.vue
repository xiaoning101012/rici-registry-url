<template>
  <div>
    <div class="banner-box" @click="closeFather">
      <img src="@/assets/index/topBan.png" alt="" />
      <div class="banner-search">
        <el-tabs v-model="activePolicy" type="card" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label">
              <el-tooltip
                content="输入企业名称，一键匹配助企惠企相关政策"
                placement="top"
              >
                <span>政策匹配</span>
              </el-tooltip>
            </span>
            <div class="search">
              <el-input
                @input="searchChange"
                placeholder="请输入企业名称，一键匹配助企惠企相关政策"
                v-model="searchValue"
                class="input-with-select"
              >
                <span slot="append" class="search_btn" @click="goPolicyMatching"
                  ><span class="search_name">匹配</span>
                </span>
              </el-input>
              <!-- 远程框 -->
              <div
                class="father"
                v-if="searchMapList.length > 0 && showAllFile"
              >
                <div
                  :class="
                    searchMapSiblis === false ? 'searchMaps' : 'searchMap'
                  "
                  v-if="searchMapList.length"
                >
                  <div
                    v-for="(item, index) in searchMapList"
                    :key="index"
                    @click="searchMapClick(item.id, item.entname, item)"
                    class="item"
                  >
                    <span>{{ item.entname }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label">
              <el-tooltip
                content="输入关键词，查找助企惠企相关政策"
                placement="top"
              >
                <span>政策查询</span>
              </el-tooltip>
            </span>
            <div class="search">
              <el-input
                placeholder="请输入关键词，查找助企惠企相关政策"
                v-model="policyName2"
                class="input-with-select"
              >
                <span slot="append" class="search_btn" @click="goPolicyInquire"
                  ><span class="search_name">搜索</span>
                </span>
              </el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="content">
      <titleBar title="惠企政策 一键直达"></titleBar>
      <!-- 热门政策 -->
      <div class="hot_policy">
        <div class="hot_policy_title">
          <div class="title_left">热门政策</div>
          <div class="title_right" @click="goPolicyLibrary">更多 >></div>
          <!-- <div class="hot-hot_policy-png" v-if="level == 1" @click="goPng()">
            2023年惠企政策事项清单(第一批)
          </div> -->
        </div>
        <div class="level">
          <div class="title">政策层级：</div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 0 }"
            @click="levelFun(0)"
          >
            国家级
          </div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 1 }"
            @click="levelFun(1)"
          >
            省级
          </div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 2 }"
            @click="levelFun(2)"
          >
            市(州)级
          </div>
        </div>
        <div
          class="hot_policy_item"
          v-for="(item, index) in hotPolicyList"
          :key="index"
        >
          <div class="title-box">
            <div class="ponit-icon"></div>
            <div class="title">
              <el-tooltip :content="item.title" placement="top" effect="light">
                <span @click="goPolicyDetail(item, 0, index)">{{
                  item.title
                }}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="time-box">
            <div class="dept">
              {{ item.addressName ? item.addressName : "/" }}
            </div>
            <div class="line">|</div>
            <div class="dept">
              {{ item.departmentName ? item.departmentName : "/" }}
            </div>
            <div class="line">|</div>
            <div>{{ item.releaseDate ? item.releaseDate : "/" }}</div>
          </div>
        </div>
      </div>
      <!-- 政策解读 -->
      <div class="hot_policy" style="margin-top: 50px">
        <div class="hot_policy_title">
          <div class="title_left">政策解读</div>
          <div class="title_right" @click="gointertail">更多 >></div>
          <!-- <div class="hot-hot_policy-png" v-if="level == 1" @click="goPng()">
            2023年惠企政策事项清单(第一批)
          </div> -->
        </div>
        <!-- <div class="level">
          <div class="title">政策层级：</div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 0 }"
            @click="levelFun(0)"
          >
            国家级
          </div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 1 }"
            @click="levelFun(1)"
          >
            省级
          </div>
          <div
            class="txt"
            :class="{ 'title-sele': level == 2 }"
            @click="levelFun(2)"
          >
            市(州)级
          </div>
        </div> -->
        <div
          class="hot_policy_item"
          v-for="(item, index) in interpretList"
          :key="index"
        >
          <div class="title-box">
            <div class="ponit-icon"></div>
            <div class="title">
              <el-tooltip :content="item.title" placement="top" effect="light">
                <span @click="intertail(item, index)">{{ item.title }}</span>
              </el-tooltip>
            </div>
          </div>
          <!-- <div class="time-box">
            <div class="dept">
              {{ item.addressName ? item.addressName : "/" }}
            </div>
            <div class="line">|</div>
            <div class="dept">
              {{ item.departmentName ? item.departmentName : "/" }}
            </div>
            <div class="line">|</div>
            <div>{{ item.publishDate ? item.publishDate : "/" }}</div>
          </div> -->
        </div>
      </div>

      <!-- 政策自测工具 -->
      <div class="self_test_policy">
        <div class="self_test_title">
          <div class="title_left">政策自测工具</div>
        </div>
        <div class="self_test_item">
          <el-carousel
            trigger="click"
            height="120px"
            :loop="false"
            arrow="never"
            indicator-position="outside"
            :autoplay="false"
          >
            <el-carousel-item>
              <div
                class="tool-item"
                v-for="(item, index) in selfTestList"
                :key="index"
                @click="goSelfTest(item)"
              >
                <img :src="item.icon" alt="" />
                <div class="title-box">
                  <div class="title">{{ item.title }}</div>
                  <div class="subtitle">{{ item.des }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 政策日历 -->
      <div class="date_policy">
        <div class="date_policy_title">
          <div class="title_left">政策日历</div>
          <div class="third-tit">按照政策施行时间展示当前月可申报的政策</div>
        </div>
        <div class="policy-box">
          <div class="month-list">
            <div
              class="month-item"
              :class="isMonth == index ? 'month-active' : ''"
              v-for="(item, index) in monthList"
              :key="index"
              @click="checkMonth(item, index)"
            >
              <div class="month">{{ item.month }}月</div>
              <div class="num">{{ item.num }}项</div>
            </div>
          </div>
          <div class="policy-list">
            <div class="scrollMenuBox">
              <div
                class="policy-item"
                v-for="(item, index) in monthPolicyList"
                :key="index"
              >
                <div class="left-box">
                  <div class="tit-box">
                    <div class="tit">
                      {{ item.projectName }}
                    </div>
                    <div class="tag" :class="item.declarable ? '' : 'gray'">
                      {{ item.declarable ? "申报期内" : "非申报期" }}
                    </div>
                  </div>
                  <div class="policy-source-box">
                    <span>政策：</span>
                    <el-tooltip
                      :content="item.title"
                      placement="bottom"
                      effect="light"
                    >
                      <span
                        class="policy-source"
                        @click="goPolicyDetail(item, 1)"
                        >{{ item.title }}</span
                      >
                    </el-tooltip>
                  </div>
                </div>
                <!-- <div class="right-box">
                  <el-button round class="btn" disabled>立即自测</el-button>
                  <el-button round class="btn" :disabled="item.selfTestUrl === null" @click="goDeclare">立即申报</el-button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 申报弹框1 -->
      <el-dialog
        class="ljsb-dialog"
        title="立即申办"
        :visible.sync="declareVisible"
        :width="ljsbWidth"
      >
        <div class="ljsb_box" v-if="isSecond == '1'">
          <div class="title">请选择需要代办的事项</div>
          <div
            class="data_item"
            @click="checkAgentMatters(item, index)"
            v-for="(item, index) in agentMatters"
            :key="index"
            :class="activeCate4 == index ? 'isAct' : ''"
          >
            <img src="~@/assets/index/text.png" alt="" /> {{ item }}
          </div>
          <div class="title2">请选择需要代办的事项</div>
          <div
            class="data_item"
            @click="checkAgentServes(item, index)"
            v-for="(item, index) in agentServes"
            :key="index"
            :class="activeCate5 == index ? 'isAct' : ''"
          >
            <img src="~@/assets/index/text3.png" alt="" /> {{ item }}
          </div>
        </div>
        <div class="ljsb_box" v-else>
          <div class="title3">
            请选择您需要办理的地区
            <span class="area">四川省> {{ checkCity }}</span>
          </div>
          <div>
            <div
              class="data_item2"
              @click="checkCurrentCity(item, index)"
              v-for="(item, index) in checkCityList"
              :key="index"
              :class="activeCate6 == index ? 'isAct' : ''"
            >
              {{ item }}
            </div>
          </div>
          <div class="title2">请选择您需要办理的事项</div>
          <div>
            <div
              class="data_item3"
              @click="checkCurrentMatters(item, index)"
              v-for="(item, index) in checkMattersList"
              :key="index"
              :class="activeCate7 == index ? 'isActa' : ''"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" round @click="sureDeclare1"
            >确 定</el-button
          >
          <el-button
            size="small"
            class="close"
            round
            @click="declareVisible = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>

      <!-- 助企服务一网通办 -->
      <div class="helpService">
        <titleBar title="助企服务 一网通办"></titleBar>
        <div
          class="content_help"
          :class="
            helpServiceName == 'ztfl'
              ? 'first_tab'
              : helpServiceName == 'fwfl'
              ? 'last_tab'
              : ''
          "
        >
          <el-tabs
            type="border-card"
            @tab-click="handleTabClick"
            v-model="helpServiceName"
          >
            <el-tab-pane label="按助企惠企主题分类" name="ztfl">
              <div class="helpService_menu1">
                <div class="triangle1"></div>
                <div class="helpService_con1">
                  <div class="more1">
                    <a
                      href="http://www.sczwfw.gov.cn/jiq/front/item/fr_index?areaCode=510000000000"
                      target="_blank"
                      >更多 >></a
                    >
                  </div>
                  <div class="text-box">
                    <div
                      class="text-item"
                      :class="{ active_one: activeOne == index }"
                      v-for="(item, index) in azqsk_list"
                      :key="item.id"
                      @click="getTypeOneLevelList(item, index)"
                    >
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="news-one">
                    <ul>
                      <li
                        v-for="(item, index) in azqsk_twolist"
                        :key="index"
                        :class="{ active: activeCate1 == index }"
                        @click="getNews(item, index)"
                      >
                        {{ item.title }}
                      </li>
                    </ul>
                  </div>
                  <div class="paginationBox">
                    <el-button
                      class="btn-sure"
                      size="mini"
                      @click="jumpFirstPage"
                      >首页</el-button
                    >
                    <el-pagination
                      ref="elpagination"
                      prev-text="上一页"
                      next-text="下一页"
                      @current-change="changeNum1"
                      :current-page="queryParam_azqsk.pageNo"
                      background
                      :page-size="queryParam_azqsk.pageSize"
                      :pager-count="5"
                      layout="prev, pager, next, slot ,total"
                      :total="total1"
                    >
                      <el-button
                        class="btn-sure"
                        size="mini"
                        @click="jumpLastPage"
                        >尾页</el-button
                      >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按企业生命周期分类" name="smzq">
              <div class="helpService_menu2">
                <div class="triangle2"></div>
                <div class="helpService_con2">
                  <div class="more2">
                    <a
                      href="http://www.sczwfw.gov.cn/jiq/front/item/fr_index?areaCode=510000000000"
                      target="_blank"
                      >更多 >></a
                    >
                  </div>
                  <div class="text-box2">
                    <div
                      class="text-item"
                      :class="{ active_one: activeTwo == index }"
                      v-for="(item, index) in qysmzq_list"
                      :key="item.id"
                      @click="getTypeTwoLevelList(item, index)"
                    >
                      <img :src="item.icon" alt="" />
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="news-one">
                    <ul>
                      <li
                        v-for="(item, index) in qysmzq_twolist"
                        :key="index"
                        :class="{ active: activeCate2 == index }"
                        @click="getNewsTwo(item, index)"
                      >
                        {{ item.title }}
                      </li>
                    </ul>
                  </div>
                  <div class="paginationBox">
                    <el-button
                      class="btn-sure"
                      size="mini"
                      @click="jumpFirstPage2"
                      >首页</el-button
                    >
                    <el-pagination
                      ref="elpagination"
                      prev-text="上一页"
                      next-text="下一页"
                      @current-change="changeNum2"
                      :current-page="queryParam_azqsk.pageNo"
                      background
                      :page-size="queryParam_azqsk.pageSize"
                      :pager-count="5"
                      layout="prev, pager, next, slot ,total"
                      :total="total2"
                    >
                      <el-button
                        class="btn-sure"
                        size="mini"
                        @click="jumpLastPage2"
                        >尾页</el-button
                      >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按一件事服务分类" name="fwfl">
              <div class="helpService_menu2">
                <div class="triangle2"></div>
                <div class="helpService_con2">
                  <div class="more2">
                    <a
                      href="http://zxbl.sczwfw.gov.cn/themes/themeService/oneThingIndex?areaCode=510000000000"
                      target="_blank"
                      >更多 >></a
                    >
                  </div>
                  <div class="text-box2">
                    <div
                      class="text-item"
                      :class="{ active_one: activeThree == index }"
                      v-for="(item, index) in yjsfw_list"
                      :key="item.id"
                      @click="getTypeThreeLevelList(item, index)"
                    >
                      <img :src="item.icon" alt="" />
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="news-one">
                    <ul>
                      <li
                        v-for="(item, index) in yjsfw_twolist"
                        :key="index"
                        :class="{ active: activeCate3 == index }"
                        @click="getNewsThree(item, index)"
                      >
                        {{ item.title }}
                      </li>
                    </ul>
                  </div>
                  <div class="paginationBox">
                    <el-button
                      class="btn-sure"
                      size="mini"
                      @click="jumpFirstPage3"
                      >首页</el-button
                    >
                    <el-pagination
                      ref="elpagination"
                      prev-text="上一页"
                      next-text="下一页"
                      @current-change="changeNum3"
                      :current-page="queryParam_azqsk.pageNo"
                      background
                      :page-size="queryParam_azqsk.pageSize"
                      :pager-count="5"
                      layout="prev, pager, next, slot ,total"
                      :total="total3"
                    >
                      <el-button
                        class="btn-sure"
                        size="mini"
                        @click="jumpLastPage3"
                        >尾页</el-button
                      >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!-- 免申即享 应享尽享 -->
      <div class="enjoyWithout">
        <titleBar title="免申即享 应享尽享"></titleBar>
        <div class="enjoyWithout_con">
          <div class="more" @click="goEnjoyWithout">更多 >></div>
          <div class="enjoyWithout_policy">
            <div
              class="enjoyWithout_item"
              v-for="(item, index) in msjx_list"
              :key="index"
            >
              <div class="title-box">
                <div class="ponit-icon"></div>
                <div class="title">
                  <el-tooltip
                    :content="item.title"
                    placement="top"
                    effect="light"
                  >
                    <span @click="goDetail(item)">{{ item.title }}</span>
                  </el-tooltip>
                </div>
                <div class="tag msjx">免申即享</div>
              </div>
              <div class="time-box">
                <div>
                  {{ item.dataReleaseDate ? item.dataReleaseDate : "/" }}
                </div>
                <div class="line">|</div>
                <div class="dept">
                  {{ item.departmentName ? item.departmentName : "/" }}
                </div>
              </div>
            </div>
            <!-- <div class="enjoyWithout_item2" v-for="(item2, index2) in msjx_list2" :key="item2.id">
              <div class="left_box">
                <div class="top_title"><span class="title">{{ item2.title }}</span><span class="new-tag">NeW</span></div>
                <div class="mid_con">
                  <div class="mid_left">
                    <div><img src="../../assets/index/fbbm.png" alt=""><span>发布部门：</span><span class="left_blue">{{
                      item2.dept }}</span></div>
                    <div><img src="../../assets/index/zclx.png" alt=""><span>政策类型：</span><span class="left_blue">{{
                      item2.type }}</span></div>
                    <div><img src="../../assets/index/dxrq.png" alt=""><span>兑现日期：</span><span class="left_blue">{{
                      item2.time }}</span></div>
                  </div>
                  <div class="mid_mid">
                    <div class="rewards">奖励金额</div>
                    <div class="amount"><span class="num">{{ item2.num }}</span>元</div>
                  </div>
                  <div class="mid_right">
                    <div class="distance">距离兑现截止</div>
                    <div class="cash"><span class="num">{{ item2.day }}</span>天</div>
                  </div>
                </div>
              </div>
              <div class="right_box">
                <el-button round type="primary" class="sure-btn" :disabled="item2.ischeck">确认兑现</el-button>
                <div v-if="item2.ischeck" class="no-qualification">暂无兑现资格</div>
                <div class="cashing-standard"><span>兑现标准</span><span class="line">丨</span><span>政策依据</span></div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- 区域助企惠企专区 -->
      <div class="qyzq">
        <titleBar title="区域助企惠企专区"></titleBar>
        <div class="qyzq_box">
          <a
            target="_blank"
            :href="item.address"
            class="qyzq_item"
            v-for="(item, index) in cityList"
            :key="index"
          >
            <img :src="`data:image/jpeg;base64,${item.image}`" alt="" />
            <div class="qyzq_text">{{ item.regionName }}</div>
          </a>
        </div>
      </div>
    </div>
    <PolicyMatching ref="Matching" />
  </div>
</template>

<script>
import titleBar from "../component/titleBar.vue";
import {
  getTypeOne,
  getTypeTwo,
  hotPolicyList,
  getPolicyType,
  getCityList,
  getFree,
  getPolicyDate,
} from "@/views/home/api";
import { getmsjx_xq } from "../msjx/api";
import { zc_qiye_list, companytag, interpret } from "./api";
import PolicyMatching from "@/views/component/PolicyMatching";

export default {
  components: { titleBar, PolicyMatching },
  data() {
    return {
      level: 1,
      activePolicy: "first",
      policyName: "",
      policyName2: "",
      //热门政策请求参数
      queryParam_rmzc: {
        addressCodeList: "510000000000",
        pageNo: 1,
        pageSize: 3,
      },
      //热门政策
      hotPolicyList: [
        // {
        //   title: '《支持专精特新中小企业提升知识产权能力的政策措施》文件解读',
        //   time: '2023-04-26',
        //   dept: '四川省知识产权服务促进中心',
        // },
        // {
        //   title: '《支持专精特新中小企业提升知识产权能力的政策措施》文件解读',
        //   time: '2023-04-26',
        //   dept: '四川省知识产权服务促进中心',
        // }
      ],
      //政策自测工具
      selfTestList: [
        {
          title: "高新技术企业认定诊断工具",
          des: "享政策补贴  税收减免",
          id: "1683743618902298626",
          icon: require("../../assets/index/xz.png"),
        },
        {
          title: "研发费用加计扣除",
          des: "一键评测  享税收优惠",
          id: "1689282599218958338",
          icon: require("../../assets/index/yffy.png"),
        },
        {
          title: "重点软件企业诊断工具",
          des: "精准诊断  享税率优惠",
          id: "1689294776533372930",
          icon: require("../../assets/index/zdrj.png"),
        },
      ],
      //政府日历参数
      queryParam_zfrl: {
        addressCode: "510000",
        year: new Date().getFullYear(),
      },
      //政策日历
      monthList: [],
      //政策日历列表
      monthPolicyList: [
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
        {
          projectName:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          title:
            "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入",
          dec: "四川省科学技术厅四川省财政厅国家税务总局四川省税务局关于印发《四川省激励企业加大研发投入后补助实施暂行办法》的通知",
          istime: false,
        },
      ],
      isMonth: -1,
      helpServiceName: "ztfl",
      activeOne: 0,
      activeTwo: 0,
      activeThree: 0,
      activeCate1: -1,
      activeCate2: -1,
      activeCate3: -1,
      activeCate4: -1,
      activeCate5: -1,
      activeCate6: -1,
      activeCate7: -1,
      total1: 0,
      total2: 0,
      total3: 0,
      //按助企惠企主题参数
      queryParam_azqsk: {
        pageNo: 1,
        pageSize: 100,
        parentId: 1,
      },
      // 助企惠企一级列表
      azqsk_list: [],
      // 助企惠企二级列表
      azqsk_twolist: [],
      // 企业生命周期列表
      qysmzq_list: [],
      qysmzq_twolist: [],
      //一件事服务列表
      yjsfw_list: [],
      yjsfw_twolist: [],
      //免申即享列表
      msjx_list: [],
      // msjx_list2: [
      //   {
      //     id: '1',
      //     title: '国家级专精特新“小巨人”企业奖励国家级专精特新“小巨人”企业奖励国家级专精特新“小巨人”企业奖励国家级专精特新“小巨人”企业奖励国家级专精特新“小巨人”企业奖励',
      //     time: '2023-04-26 至 2023-04-29',
      //     dept: '四川省人民政府',
      //     type: '资质认定',
      //     num: '50,000',
      //     day: '307',
      //     ischeck: true
      //   },
      //   {
      //     id: '2',
      //     title: '国家级专精特新“小巨人”企业奖励',
      //     time: '2023-04-26 至 2023-04-29',
      //     type: '资质认定',
      //     dept: '四川省人民政府',
      //     num: '50,000',
      //     day: '307',
      //     ischeck: false
      //   }
      // ],
      //区域助企惠企专区列表
      cityList: [
        // {
        //   url: require("../../assets/index/cds.png"),
        //   title: "成都市",
        //   path: "http://www.sczwfw.gov.cn/col/col61061/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../../assets/index/zgs.png"),
        //   title: "自贡市",
        //   path: "http://www.sczwfw.gov.cn/col/col61062/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../../assets/index/pzhs.png"),
        //   title: "攀枝花市",
        //   path: "http://www.sczwfw.gov.cn/col/col61063/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../../assets/index/lzz.png"),
        //   title: "泸州市",
        //   path: "http://lzs.sczwfw.gov.cn/col/col61225/index.html?areaCode=510500000000"
        // },
        // {
        //   url: require("../../assets/index/dys.png"),
        //   title: "德阳市",
        //   path: "http://www.sczwfw.gov.cn/col/col61065/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../../assets/index/my.png"),
        //   title: "绵阳市",
        //   path: "https://mqt.mianyang.cn/#/"
        // },
        // {
        //   url: require("../../assets/index/sns.png"),
        //   title: "遂宁市",
        //   path: "http://sns.sczwfw.gov.cn/col/col61226/?areaCode=510900000000"
        // },
        // {
        //   url: require("../../assets/index/njs.png"),
        //   title: "内江市",
        //   path: "http://njs.sczwfw.gov.cn/col/col61196/index.html?areaCode=511000000000"
        // },
        // {
        //   url: require("../../assets/index/gys.png"),
        //   title: "广元市",
        //   path: "http://www.sczwfw.gov.cn/col/col61067/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../assets/index/ncs.png"),
        //   title: "南充市",
        //   path: "http://www.sczwfw.gov.cn/col/col61091/index.html?areaCode=510000000000"
        // },
        // {
        //   url: require("../assets/index/ybs.png"),
        //   title: "宜宾市",
        //   path: "http://www.sczwfw.gov.cn/col/col61070/index.html?areaCode=510000000000"
        // },
      ],
      //申报弹框
      declareVisible: false,
      // 申报代办事项
      agentMatters: [
        "特种设备作业人员资格认定补发",
        "特种设备作业人员资格认定补发",
        "特种设备作业人员资格认定补发",
      ],
      // 申报代办服务
      agentServes: ["特种设备作业人员资格认定补发"],
      // 申报弹框内容
      isSecond: "1",
      // 申报弹框办理的地区
      checkCity: "",
      checkCityList: [
        "成都市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市",
        "绵阳市",
        "广元市",
        "遂宁市",
        "内江市",
        "乐山市",
        "南充市",
        "宜宾市",
        "广安市",
        "巴中市",
        "达州市",
        "雅安市",
        "眉山市",
        "资阳市",
        "阿坝州",
        "甘孜州",
        "凉山州",
      ],
      checkMattersList: ["事项名称A"],
      // 申报弹框宽度
      ljsbWidth: "586px",

      // 匹配
      showAllFile: false,
      // 远程检索数据
      searchMapList: [],
      // 是否展示远程搜索
      ValueData: "",
      // 跳转
      Matching: {},
      searchValue: "",
      searchMapSiblis: false,
      // 判断有没有点击下拉框
      viewIf: false,
      interpretList: [],
    };
  },
  created() {
    this.getCurMonth();
    this.getTypeOneList();
    this.getAllCityList();
    this.levelFun(1);
    this.interpretApi();
  },
  methods: {
    gointertail() {
      const { href } = this.$router.resolve({
        path: "/zcjd",
      });
      window.open(href, "_blank");
    },
    intertail(item, index) {
      console.log(item);
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "4",
        },
      });
      window.open(href, "_blank");
    },
    interpretApi() {
      let data = {
        pageNo: 1,
        pageSize: 4,
      };
      interpret(data).then((res) => {
        if (res.code == 200) {
          this.interpretList = res.result.records;
        }
      });
    },
    levelFun(index) {
      if (index == 0) {
        this.queryParam_rmzc.addressCodeList = "100000000000";
      } else if (index == 1) {
        this.queryParam_rmzc.addressCodeList = "510000000000";
      } else if (index == 2) {
        this.queryParam_rmzc.addressCodeList =
          "513400000000,513300000000,513200000000,512000000000,511900000000,511800000000,511700000000,511600000000,511500000000,511400000000,511300000000,511100000000,511000000000,510900000000,510800000000,510700000000,510600000000,510500000000,510400000000,510300000000,510100000000";
      }
      this.level = index;

      hotPolicyList(this.queryParam_rmzc).then((res) => {
        if (this.level == 1) {
          let obj = {};
          obj.title = "2023年省级惠企政策事项清单(第一批)";
          obj.addressName = "四川省";
          obj.releaseDate = "2023-12-12";
          res.result.records.unshift(obj);
        }
        if (this.level == 0) {
          let obj = {};
          obj.title = "2023年国家级惠企政策事项清单(第一批)";
          obj.addressName = "国家级";
          obj.releaseDate = "2023-12-14";
          res.result.records.unshift(obj);
        }
        this.hotPolicyList = res.result.records;
      });
    },
    searchMapClick(data, arr, item) {
      this.viewIf = true;
      this.Matching = item;
      this.ValueData = data;
      this.searchValue = arr;
    },
    // 关闭远程搜索
    closeFather() {
      this.showAllFile = false;
    },
    //远程检索相关企业
    async searchChange(val) {
      this.showAllFile = true;
      let params = {
        cityName: 510000,
        companyName: val,
      };
      let res = await zc_qiye_list(params);
      if (res.result.length >= 5) {
        this.searchMapSiblis = true;
      } else {
        this.searchMapSiblis = false;
      }
      this.searchMapList = res.result;
    },
    // 政策匹配搜索
    goPolicyMatching() {
      // 是否填写
      if (localStorage.getItem("DLone")) {
        localStorage.removeItem("DLone");
      }
      if (this.viewIf === true) {
        if (this.searchValue) {
          this.ValueData = this.Matching.id;
          companytag({ companyId: this.ValueData }).then((res) => {
            if (res.success) {
              if (res.result === 0) {
                this.viewIf = false;
                this.$refs.Matching.dialog(this.Matching);
              } else {
                this.viewIf = false;
                const { href } = this.$router.resolve({
                  path: "/policyMatching",
                  query: {
                    entname: this.Matching.entname,
                    uniscid: this.Matching.uniscid,
                    addressCode: this.Matching.addressCode,
                    id: this.Matching.id,
                    isActive: false,
                  },
                });
                window.open(href, "_blank");
              }
            }
          });
        }
      }
    },
    // 政策查询
    goPolicyInquire() {
      const { href } = this.$router.resolve({
        path: "/policyInquire",
        query: {
          name: this.policyName2,
        },
      });
      window.open(href, "_blank");
    },
    goPng() {
      const { href } = this.$router.resolve({
        path: "/pdfwj",
      });
      window.open(href, "_blank");
    },
    goPng1() {
      const { href } = this.$router.resolve({
        path: "/pdfwj1",
      });
      window.open(href, "_blank");
    },
    //热门政策更多
    goPolicyLibrary() {
      const { href } = this.$router.resolve({
        path: "/policyLibrary",
      });
      window.open(href, "_blank");
    },
    // 立即自测
    goSelfTest(item) {
      const { href } = this.$router.resolve({
        path: "/selfTest",
        query: {
          id: item.id,
        },
      });
      window.open(href, "_blank");
    },
    // 政策详情
    goPolicyDetail(item, arr, index) {
      if (this.level == 1 && index == 0) {
        this.goPng();
      } else if (this.level == 0 && index == 0) {
        this.goPng1();
      } else {
        // console.log(item)
        if (arr === 0) {
          const { href } = this.$router.resolve({
            path: "/policyDetail",
            query: {
              id: item.id,
              type: "2",
            },
          });
          window.open(href, "_blank");
        } else {
          if (item.policyHyperLink) {
            window.open(item.policyHyperLink)
          } else {
            const { href } = this.$router.resolve({
              path: "/policyDetail",
              query: {
                id: item.cid,
                type: "2",
              },
            });
            window.open(href, "_blank");
          }
        }
      }
    },
    // 跳转免审即享
    goEnjoyWithout() {
      const { href } = this.$router.resolve({
        path: "/enjoyWithout",
        // query: {
        //   val: '1',
        // },
      });
      window.open(href, "_blank");
    },
    //详情
    goDetail(item) {
      const { href } = this.$router.resolve({
        path: "/policyDetail",
        query: {
          id: item.id,
          type: "1",
        },
      });
      window.open(href, "_blank");
    },
    //获取当前月份
    getCurMonth() {
      var time = new Date();
      this.isMonth = time.getMonth();
      // console.log(this.isMonth);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    //选择月份
    checkMonth(item, index) {
      this.isMonth = index;
      this.monthPolicyList = item.records;
    },
    // 申报弹框
    goDeclare() {
      this.ljsbWidth = "586px";
      this.isSecond = "1";
      this.activeCate4 = -1;
      this.activeCate5 = -1;
      this.activeCate6 = -1;
      this.activeCate7 = -1;

      this.declareVisible = true;
    },
    // 请选择需要代办的事项
    checkAgentMatters(item, index) {
      this.activeCate4 = index;
    },
    // 请选择需要代办的事项
    checkAgentServes(item, index) {
      this.activeCate5 = index;
    },
    // 申报弹框1确认
    sureDeclare1() {
      // this.declareVisible = false
      this.ljsbWidth = "824px";
      this.isSecond = "2";
    },
    // 申报弹框选择地区
    checkCurrentCity(item, index) {
      this.activeCate6 = index;

      this.checkCity = item;
    },
    // 申报弹框选择需要的事项
    checkCurrentMatters(item, index) {
      this.activeCate7 = index;
    },
    //重置助其纾困请求表单
    reset() {
      this.queryParam_azqsk = {
        pageNo: 1,
        pageSize: 12,
        parentId: 1,
      };
    },
    //获取助企惠企主题列表
    async getTypeOneList() {
      this.activeCate1 = -1;
      this.queryParam_azqsk.pageNo = 1;
      let res = await getTypeOne(this.queryParam_azqsk);
      this.azqsk_list = res.result;
      this.queryParam_azqsk.parentId = this.azqsk_list[0].id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList();
    },
    async getTypeOneLevelList(i, e) {
      this.reset();
      this.activeOne = e;
      this.queryParam_azqsk.parentId = i.id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList();
    },

    //助企服务三级菜单跳转
    getNews(i, m) {
      this.activeCate1 = m;
      // console.log(i);
      window.open(i.pcUrl);
      // window.location.href = i.url
    },
    // 获取助企服务三级列表数据
    async getTypeThreeList() {
      this.activeCate1 = -1;
      let res = await getTypeTwo(this.queryParam_azqsk);
      this.azqsk_twolist = res.result.records;
      this.total1 = res.result.total;
    },
    // 助企服务三级列表翻页
    changeNum1(page) {
      this.queryParam_azqsk.pageNo = page;
      this.getTypeThreeList();
    },
    // 助企服务三级列表首页
    jumpFirstPage() {
      this.queryParam_azqsk.pageNo = 1;
      this.getTypeThreeList();
    },
    // 助企服务三级列表尾页
    jumpLastPage() {
      let num = Math.ceil(this.total1 / this.queryParam_azqsk.pageSize);
      this.queryParam_azqsk.pageNo = num;
      this.getTypeThreeList();
    },
    //获取企业生命周期列表
    async getTypeTwoList() {
      this.queryParam_azqsk.pageNo = 1;
      this.queryParam_azqsk.parentId = 71;
      this.queryParam_azqsk.pageSize = 100;
      let res = await getTypeOne(this.queryParam_azqsk);
      this.qysmzq_list = res.result;
      this.queryParam_azqsk.parentId = this.qysmzq_list[0].id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList2();
    },
    //获取企业生命周期三级列表
    async getTypeThreeList2() {
      this.activeCate2 = -1;
      let arr = await getTypeTwo(this.queryParam_azqsk);
      this.qysmzq_twolist = arr.result.records;
      this.total2 = arr.result.total;
    },
    async getTypeTwoLevelList(i, e) {
      this.reset();
      this.activeTwo = e;
      this.queryParam_azqsk.parentId = i.id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList2();
    },
    getNewsTwo(i, m) {
      this.activeCate2 = m;
      window.open(i.pcUrl);
    },
    // 企业生命周期三级列表翻页
    changeNum2(page) {
      this.queryParam_azqsk.pageNo = page;
      this.getTypeThreeList2();
    },
    // 企业生命周期三级列表首页
    jumpFirstPage2() {
      this.queryParam_azqsk.pageNo = 1;
      this.getTypeThreeList2();
    },
    // 企业生命周期三级列表尾页
    jumpLastPage2() {
      let num = Math.ceil(this.total2 / this.queryParam_azqsk.pageSize);
      this.queryParam_azqsk.pageNo = num;
      this.getTypeThreeList2();
    },
    //获取一件事服务列表
    async getTypeThree() {
      this.queryParam_azqsk.pageNo = 1;
      this.queryParam_azqsk.parentId = 109;
      this.queryParam_azqsk.pageSize = 100;
      let res = await getTypeOne(this.queryParam_azqsk);
      this.yjsfw_list = res.result;
      this.queryParam_azqsk.parentId = this.yjsfw_list[0].id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList3();
    },
    //获取一件事服务三级列表
    async getTypeThreeList3() {
      this.activeCate3 = -1;
      let arr = await getTypeTwo(this.queryParam_azqsk);
      this.yjsfw_twolist = arr.result.records;
      this.total3 = arr.result.total;
    },
    async getTypeThreeLevelList(i, e) {
      this.reset();
      this.activeThree = e;
      this.queryParam_azqsk.parentId = i.id;
      this.queryParam_azqsk.pageSize = 12;
      this.getTypeThreeList3();
    },
    getNewsThree(i, m) {
      this.activeCate3 = m;
      window.open(i.pcUrl);
    },
    // 一件事服务三级列表翻页
    changeNum3(page) {
      this.queryParam_azqsk.pageNo = page;
      this.getTypeThreeList3();
    },
    // 一件事服务三级列表首页
    jumpFirstPage3() {
      this.queryParam_azqsk.pageNo = 1;
      this.getTypeThreeList3();
    },
    // 一件事服务三级列表尾页
    jumpLastPage3() {
      let num = Math.ceil(this.total3 / this.queryParam_azqsk.pageSize);
      this.queryParam_azqsk.pageNo = num;
      this.getTypeThreeList3();
    },
    //助企服务一网通办--菜单切换
    handleTabClick(tab, event) {
      // console.log(tab, event);
      if (tab.name == "ztfl") {
        (this.queryParam_azqsk = {
          pageNo: 1,
          pageSize: 100,
          parentId: 1,
        }),
          this.getTypeOneList();
      } else if (tab.name == "smzq") {
        this.getTypeTwoList();
      } else if (tab.name == "fwfl") {
        this.getTypeThree();
      }
    },

    //获取区域助企惠企专区列表
    getAllCityList() {
      getCityList().then((res) => {
        // console.log(res);
        this.cityList = res.result.filter((item) => {
          if (item.status == 1 && item.address) {
            return item;
          }
        });
      });
      getFree({ pageNo: 1, pageSize: 3 }).then((res) => {
        // console.log(res);
        this.msjx_list = res.result.records;
      });
      getPolicyDate(this.queryParam_zfrl).then((res) => {
        // console.log(res);
        this.monthList = res.result;
        let newArr = this.monthList.filter(
          (item) => item.month == this.isMonth + 1
        );
        this.monthPolicyList = newArr[0].records;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.banner-box {
  width: 100%;
  position: relative;
  z-index: 9;

  img {
    width: 100%;
    display: block;
  }

  .banner-search {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    // width: 634px;
    width: 1278px;
    margin-top: 1.25rem;
    padding-bottom: 2rem;

    .search_btn {
      cursor: pointer;
    }

    ::v-deep .el-tabs__content {
      width: 50%;
      overflow: inherit;
    }

    ::v-deep .el-tabs--card > .el-tabs__header {
      border-bottom: none;
    }

    ::v-deep .el-tabs__header {
      margin: 0;
    }

    ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
      border-color: transparent;
    }

    ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-color: transparent;
    }

    ::v-deep .el-tabs__item {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #ffffff;
      line-height: 46px;
      height: 46px;
      padding: 0 24px;
      text-shadow: 0px 2px 6px rgba(14, 45, 115, 0.5);
    }

    ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      background: hsla(0, 0%, 100%, 0.2);
      border-radius: 5px 0 0 0;
    }

    ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
      border-radius: 0 5px 0 0;
    }

    ::v-deep .el-input__inner {
      border-radius: 0;
      border-color: transparent;
      height: 58px;
      line-height: 58px;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
    }

    ::v-deep .el-input-group__append {
      background: #2055c9;
      color: #fff;
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      width: 172px;
      text-align: center;
      border-color: transparent;
      border-radius: 0 5px 5px 0;
    }

    .search_name {
      margin-right: 10px;
      letter-spacing: 7px;
    }

    .search {
      position: relative;

      .father {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 10px;
        z-index: 9999;

        .searchMap {
          // width: 6rem;
          // height: 6rem;
          overflow-y: scroll;
          margin: auto;
          // background: #ffffff;
          // border-radius: 0.08rem;
          // box-shadow: 0 0 0.1rem rgb(221, 214, 214);
          padding-top: 10px;
          width: 490px;
          max-height: 238px;
          min-height: 65px;
          background: #ffffff;
          box-shadow: 0px 0px 4px 0px rgba(227, 227, 227, 0.5);
          border-radius: 4px;
          border: 1px solid #e1e1e1;

          .item {
            // width: 798px;
            height: 44px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            color: #666666;
            // font-size: 0.14rem;
            list-style: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 16px;

            &:hover {
              background: #f6f6f6;
              color: #000000;
            }
          }
        }

        .searchMaps {
          // width: 6rem;
          // height: 6rem;
          overflow-y: auto;
          margin: auto;
          // background: #ffffff;
          // border-radius: 0.08rem;
          // box-shadow: 0 0 0.1rem rgb(221, 214, 214);
          padding-top: 10px;
          width: 490px;
          max-height: 238px;
          min-height: 65px;
          background: #ffffff;
          box-shadow: 0px 0px 4px 0px rgba(227, 227, 227, 0.5);
          border-radius: 4px;
          border: 1px solid #e1e1e1;

          .item {
            // width: 798px;
            height: 44px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            color: #666666;
            // font-size: 0.14rem;
            list-style: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 16px;

            &:hover {
              background: #f6f6f6;
              color: #000000;
            }
          }
        }
      }

      ::v-deep .el-input-group__append {
        width: 146px;
        height: 58px;
        background: #1f59d8;
        border-radius: 0px 4px 4px 0px;
        padding-left: 48px;

        span {
          display: inline-block;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: -3px;
            left: -33px;
            width: 25px;
            height: 25px;
            background-image: url("~@/assets/hq_zc_pipei/search.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}

.content {
  width: 1221px;
  margin: 0 auto;

  .hot_policy {
    .hot_policy_title {
      display: flex;
      justify-content: space-between;
      padding: 0 0 1.3125rem 0.9375rem;
      border-bottom: 0.0625rem solid #535256;
      position: relative;
      .hot-hot_policy-png {
        width: 260px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        position: absolute;
        font-size: 14px;
        border: 1px solid #000;
        border-radius: 5px;
        bottom: -15px;
        left: 150px;
        z-index: 99;
        background-color: white;
        cursor: pointer;
      }
      .title_left {
        font-size: 1.25rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #535256;
        line-height: 1.25rem;
        height: 1.25rem;
        position: relative;

        &::before {
          position: absolute;
          content: "";
          width: 0.1875rem;
          height: 1.25rem;
          background: #2055c9;
          top: 0.0625rem;
          left: -14px;
        }
      }

      .title_right {
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #2055c9;
        line-height: 1.5rem;
        letter-spacing: 0.0625rem;
        cursor: pointer;
      }
    }

    .hot_policy_item {
      padding: 1.5rem 0 0;

      .title-box {
        display: flex;

        .ponit-icon {
          width: 0.25rem;
          height: 0.25rem;
          background: #2055c9;
          border-radius: 50%;
          margin-right: 1rem;
          margin-top: 0.625rem;
        }

        .title {
          font-size: 1.25rem;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #333;
          line-height: 1.1875rem;
          line-height: 1.75rem;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: calc(100% - 13.75rem);
        }
      }

      .time-box {
        margin-top: 0.75rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        font-size: 1rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        color: #9f9fa7;
        line-height: 1.1875rem;
        padding-left: 1.25rem;

        .line {
          font-size: 0.875rem;
          margin: 0 0.9375rem 0 1.875rem;
          width: 1rem;
          text-align: center;
        }
      }
    }
  }

  .self_test_policy {
    .self_test_title {
      display: flex;
      justify-content: space-between;
      padding: 0 0 1.3125rem 0.9375rem;
      border-bottom: 0.0625rem solid #535256;
      margin-top: 3.125rem;
      margin-bottom: 1.875rem;

      .title_left {
        font-size: 1.25rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #535256;
        line-height: 1.25rem;
        height: 1.25rem;
        position: relative;

        &::before {
          position: absolute;
          content: "";
          width: 0.1875rem;
          height: 1.25rem;
          background: #2055c9;
          top: 0.0625rem;
          left: -14px;
        }
      }
    }

    .self_test_item {
      ::v-deep .carousel-item {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
      }

      ::v-deep .el-carousel__item {
        display: flex;
      }

      .tool-item {
        height: 7.125rem;
        padding-left: 3.125rem;
        padding-top: 1.9375rem;
        background: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: rgba(221, 107, 71, 0.1);
        cursor: pointer;
        margin-right: 1.25rem;
        width: 400px;

        img {
          width: 3rem;
          height: 3rem;
        }

        .title-box {
          height: 3rem;
          margin-left: 0.8125rem;

          .title {
            font-size: 1.125rem;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: 700;
            color: #333;
            line-height: 1.625rem;
          }

          .subtitle {
            font-size: 1rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #999;
            line-height: 1.5rem;
            margin-top: 0.125rem;
          }
        }
      }

      ::v-deep .el-carousel__button {
        background: #e6e7eb;
        height: 4px;
        border-radius: 5px;
        width: 40px;
      }

      ::v-deep .el-carousel__indicator--horizontal {
        padding: 20px 0;
      }

      ::v-deep .is-active {
        .el-carousel__button {
          width: 60px;
          background: #de704b !important;
        }
      }
    }
  }

  .date_policy {
    .date_policy_title {
      display: flex;
      padding: 0 0 1.3125rem 0.9375rem;
      border-bottom: 0.0625rem solid #535256;
      margin-bottom: 1.25rem;

      .title_left {
        font-size: 1.25rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #535256;
        line-height: 1.25rem;
        height: 1.25rem;
        position: relative;

        &::before {
          position: absolute;
          content: "";
          width: 0.1875rem;
          height: 1.25rem;
          background: #2055c9;
          top: 0.0625rem;
          left: -14px;
        }
      }

      .third-tit {
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 700;
        color: #333;
        margin-left: 0.875rem;
      }
    }

    .policy-box {
      padding: 1.8125rem 1.1875rem 0.625rem 1.8125rem;
      border: 0.0625rem solid #de704b;

      .month-list {
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        margin-bottom: 1.9375rem;
        padding-right: 0.625rem;

        .month-item {
          padding: 0.6875rem 0.625rem;
          text-align: center;
          cursor: pointer;

          .month {
            font-size: 1.25rem;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: 700;
            color: #333;
            line-height: 1.8125rem;
          }

          .num {
            font-size: 0.9375rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #999;
            height: 1.5rem;
            line-height: 1.5rem;
            width: 3.75rem;
            margin-top: 0.375rem;
          }
        }

        .month-active {
          background: #2055c9;
          border-radius: 0.3125rem;

          .month {
            color: #fff;
          }

          .num {
            background: hsla(0, 0%, 100%, 0.3);
            color: #fff;
            border-radius: 0.25rem;
          }
        }
      }

      .policy-list {
        .scrollMenuBox {
          height: 26.125rem;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 5px;
          }

          .policy-item {
            padding-top: 1.5rem;
            padding-bottom: 1.25rem;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            margin-right: 0.625rem;

            .left-box {
              // width: calc(100% - 21.875rem);
              width: 100%;

              .tit-box {
                display: flex;

                .tit {
                  font-size: 1.1875rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #333;
                  line-height: 1.75rem;
                  max-width: calc(100% - 6.25rem);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .tag {
                  margin-left: 0.625rem;
                  background: #2055c9;
                  border-radius: 0.3125rem;
                  width: 5rem;
                  height: 1.75rem;
                  line-height: 1.75rem;
                  text-align: center;
                  font-size: 0.875rem;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  color: #fbfbfc;
                }

                .gray {
                  background: #f5f5f6;
                  color: #afbac6;
                }
              }

              .policy-source-box {
                font-size: 1rem;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #999;
                line-height: 1rem;
                margin-top: 0.9375rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                .policy-source {
                  color: #de6d49;
                  cursor: pointer;
                }
              }
            }

            .right-box {
              display: flex;
              -webkit-box-pack: end;
              -webkit-justify-content: flex-end;
              justify-content: flex-end;
              width: 21.875rem;
              padding-top: 0.5625rem;

              .btn {
                width: 9.625rem;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                border-radius: 1.3125rem;
                border: 0.0625rem solid #2055c9;
                margin-left: 1rem;
                font-size: 1rem;
                font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                font-weight: 700;
                color: #2055c9;
                letter-spacing: 0.0625rem;
                padding: 0;
              }

              .is-disabled {
                background: #f5f5f6;
                border: 0.0625rem solid #afbac6;
                color: #b1bac5;
              }
            }
          }
        }
      }
    }
  }

  .helpService {
    .content_help {
      width: 1200px;
      background: #fbfbfd;
      padding: 20px 20px 15px;
      // cursor: pointer;
      border-radius: 10px 10px 0px 0px;
      border: 1px solid #2055c9;
      margin: 0 auto;

      ::v-deep .el-tabs--border-card {
        border: none;
        box-shadow: none;
      }

      ::v-deep .el-tabs--border-card > .el-tabs__header {
        border-bottom: none;
        background: #f5f5f6;
      }

      ::v-deep .el-tabs__item {
        width: 387px;
        height: 66px;
        text-align: center;
        line-height: 66px;
        color: rgba(163, 162, 173, 1);
        font-size: 18px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        position: relative;

        &:nth-child(2) {
          &::before {
            position: absolute;
            content: "";
            width: 2px;
            height: 20px;
            background: #a3a2ae;
            border-radius: 1px;
            top: 23px;
            left: 0;
            z-index: -1;
          }

          &::after {
            position: absolute;
            content: "";
            width: 2px;
            height: 20px;
            background: #a3a2ae;
            border-radius: 1px;
            top: 23px;
            right: 0;
            z-index: -1;
          }
        }
      }

      ::v-deep .el-tabs__item:not(.is-disabled):hover {
        color: rgba(163, 162, 173, 1);
      }

      ::v-deep .is-active {
        border-right-color: transparent;
        border-left-color: transparent;
        background: #2055c9;
        color: #ffffff;

        &:hover {
          color: #ffffff !important;
        }
      }

      ::v-deep .el-tabs--border-card > .el-tabs__content {
        padding: 0;
        background: #fbfbfd;
      }
    }

    .first_tab {
      ::v-deep .el-tabs__item {
        &:nth-child(2) {
          &::before {
            display: none;
          }
        }
      }
    }

    .last_tab {
      ::v-deep .el-tabs__item {
        &:nth-child(2) {
          &::after {
            display: none;
          }
        }
      }
    }

    .helpService_menu1 {
      position: relative;
      transform: translateY(5px);
      background: #fff;

      .triangle1 {
        width: 0;
        height: 0;
        border-bottom: 15px solid #fff;
        border-right: 19px solid transparent;
        border-left: 19px solid transparent;
        position: absolute;
        top: -15px;
        left: 193px;
      }

      .helpService_con1 {
        margin: 20px 0;
        border-radius: 10px;
        overflow: hidden;
        // background-color: #fff;

        .more1 {
          padding-right: 20px;
          padding-top: 20px;
          text-align: right;
          color: #2055c9;
          cursor: pointer;

          a {
            color: #2055c9;
          }
        }

        .text-box {
          overflow: hidden;

          .text-item {
            list-style: none;
            height: 64px;
            float: left;
            width: 274px;
            margin: 10px;
            background: #ffffff;
            box-shadow: 3px 7px 20px 0px rgba(16, 48, 116, 0.05);
            border-radius: 5px;
            display: table;
            text-align: center;
            cursor: pointer;

            &:nth-child(4n + 1) {
              margin-left: 0px;
            }

            &:nth-child(4n) {
              margin-right: 0px;
            }

            span {
              display: table-cell;
              vertical-align: middle;
              font-size: 18px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
            }
          }

          .active_one {
            background: #ebf2ff !important;
            color: #406ed2;
            border: 1px solid #2055c9;
          }
        }

        .news-one {
          overflow: hidden;

          ul {
            overflow: hidden;
            padding-left: 20px;
            margin-top: 30px;

            li {
              margin: 0;
              padding: 0;
              width: 353px;
              float: left;
              height: 26px;
              font-size: 18px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333333;
              line-height: 26px;
              overflow: hidden;
              position: relative;
              box-sizing: border-box;
              padding-left: 16px;
              margin-right: 26px;
              margin-bottom: 24px;
              cursor: pointer;

              &::before {
                position: absolute;
                content: "";
                width: 4px;
                height: 4px;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background: #2055c9;
                border-radius: 50%;
              }

              span {
                display: block;
                width: 327px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          .active {
            color: #5e84d8 !important;
          }
        }

        .paginationBox {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;

          .btn-sure {
            padding: 8px 15px;
            margin-left: 2px;
            border-radius: 2px;
            height: 30px;
            font-size: 13px;
            text-decoration: none;
            border: solid 1px rgba(209, 220, 229, 1);
            color: rgba(72, 87, 106, 1);
            text-align: center;
            background: #fff;

            &:hover {
              background-color: #fff !important;
            }

            ::v-deep span {
              min-width: unset !important;
              line-height: 14px !important;
            }
          }

          .el-pagination {
            padding: 0 5px 2px;

            ::v-deep .btn-prev,
            ::v-deep .btn-next {
              background-color: #fff;
              color: rgba(72, 87, 106, 1);
              min-width: unset;
              padding: 8px 15px;
              border: solid 1px rgba(209, 220, 229, 1);
              height: 30px;

              span {
                line-height: 14px !important;
              }
            }

            ::v-deep .el-pager li {
              background-color: #fff;
              color: rgba(72, 87, 106, 1);
              min-width: unset;
              padding: 8px 15px;
              border: solid 1px rgba(209, 220, 229, 1);
              height: 30px;
              line-height: 14px !important;
              font-weight: 500;
            }

            ::v-deep .more::before {
              line-height: 15px !important;
            }

            ::v-deep .active {
              background-color: rgba(32, 85, 201, 1) !important;
              color: #fff !important;
              border: 1px solid rgba(32, 85, 201, 1) !important;
            }

            ::v-deep .el-pagination__total {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              margin-left: 10px;
              color: #48576a;
            }
          }
        }
      }
    }

    .helpService_menu2 {
      position: relative;
      transform: translateY(5px);
      background: #fff;

      .triangle2 {
        width: 0;
        height: 0;
        border-bottom: 15px solid #fff;
        border-right: 19px solid transparent;
        border-left: 19px solid transparent;
        position: absolute;
        top: -15px;
        left: 552px;
      }

      .helpService_con2 {
        margin: 20px 0;
        border-radius: 10px;
        overflow: hidden;
        // background-color: #fff;

        .more2 {
          padding-right: 20px;
          padding-top: 20px;
          text-align: right;
          color: #2055c9;
          cursor: pointer;

          a {
            color: #2055c9;
          }
        }

        .text-box2 {
          overflow: hidden;
          padding-left: 20px;

          .text-item {
            list-style: none;
            float: left;
            width: 104px;
            height: 90px;
            margin: 10px;
            background: #ffffff;
            border-radius: 5px;
            display: table;
            text-align: center;
            cursor: pointer;
            padding-top: 17px;
            border: 1px solid #2055c9;

            &:hover {
              box-shadow: 0px 2px 20px 0px rgba(21, 66, 144, 0.6);
            }

            img {
              display: block;
              margin: 0 auto;
              height: 22px;
            }

            span {
              margin-top: 8px;
              display: block;
              color: #2055c9;
              font-size: 18px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
            }
          }

          .active_one {
            background: #ebf2ff !important;
            color: #406ed2;
            border: 1px solid #2055c9;
          }
        }

        .news-one {
          overflow: hidden;

          ul {
            overflow: hidden;
            padding-left: 20px;
            margin-top: 30px;

            li {
              margin: 0;
              padding: 0;
              width: 353px;
              float: left;
              height: 26px;
              font-size: 18px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333333;
              line-height: 26px;
              overflow: hidden;
              position: relative;
              box-sizing: border-box;
              padding-left: 16px;
              margin-right: 26px;
              margin-bottom: 24px;
              cursor: pointer;

              &::before {
                position: absolute;
                content: "";
                width: 4px;
                height: 4px;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background: #2055c9;
                border-radius: 50%;
              }

              span {
                display: block;
                width: 327px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          .active {
            color: #5e84d8 !important;
          }
        }

        .paginationBox {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;

          .btn-sure {
            padding: 8px 15px;
            margin-left: 2px;
            border-radius: 2px;
            height: 30px;
            font-size: 13px;
            text-decoration: none;
            border: solid 1px rgba(209, 220, 229, 1);
            color: rgba(72, 87, 106, 1);
            text-align: center;
            background: #fff;

            &:hover {
              background-color: #fff !important;
            }

            ::v-deep span {
              min-width: unset !important;
              line-height: 14px !important;
            }
          }

          .el-pagination {
            padding: 0 5px 2px;

            ::v-deep .btn-prev,
            ::v-deep .btn-next {
              background-color: #fff;
              color: rgba(72, 87, 106, 1);
              min-width: unset;
              padding: 8px 15px;
              border: solid 1px rgba(209, 220, 229, 1);
              height: 30px;

              span {
                line-height: 14px !important;
              }
            }

            ::v-deep .el-pager li {
              background-color: #fff;
              color: rgba(72, 87, 106, 1);
              min-width: unset;
              padding: 8px 15px;
              border: solid 1px rgba(209, 220, 229, 1);
              height: 30px;
              line-height: 14px !important;
              font-weight: 500;
            }

            ::v-deep .more::before {
              line-height: 15px !important;
            }

            ::v-deep .active {
              background-color: rgba(32, 85, 201, 1) !important;
              color: #fff !important;
              border: 1px solid rgba(32, 85, 201, 1) !important;
            }

            ::v-deep .el-pagination__total {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              margin-left: 10px;
              color: #48576a;
            }
          }
        }
      }
    }
  }

  .enjoyWithout {
    .enjoyWithout_con {
      .more {
        padding-right: 20px;
        text-align: right;
        color: #2055c9;
        cursor: pointer;
      }

      .enjoyWithout_policy {
        .enjoyWithout_item {
          padding: 1.5rem 0 0;

          .title-box {
            display: flex;

            .ponit-icon {
              width: 0.25rem;
              height: 0.25rem;
              background: #2055c9;
              border-radius: 50%;
              margin-right: 1rem;
              margin-top: 0.625rem;
            }

            .title {
              font-size: 1.25rem;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333;
              line-height: 1.1875rem;
              line-height: 1.75rem;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: calc(100% - 13.75rem);
            }

            .tag {
              height: 1.75rem;
              line-height: 1.75rem;
              padding: 0 0.75rem;
              border-radius: 0.3125rem;
              color: #fbfbfc;
              font-size: 0.875rem;
              margin-left: 0.75rem;
            }

            .msjx {
              background: #2458ca;
            }
          }

          .time-box {
            margin-top: 0.75rem;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            font-size: 1rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            color: #9f9fa7;
            line-height: 1.1875rem;
            padding-left: 1.25rem;

            .line {
              font-size: 0.875rem;
              margin: 0 0.9375rem 0 1.875rem;
              width: 1rem;
              text-align: center;
            }
          }
        }

        .enjoyWithout_item2 {
          display: flex;
          background: #fbfbfd;
          box-shadow: 0px 2px 10px 0px rgba(41, 63, 146, 0.06);
          padding: 20px;
          margin-top: 30px;

          .left_box {
            width: 80%;

            .top_title {
              font-size: 20px;
              font-family: SourceHanSansCN-Medium, SourceHanSansCN;
              font-weight: 500;
              color: #333333;
              margin-bottom: 10px;

              .title {
                // height: 28px;
                display: inline-block;
                line-height: 28px;
                max-width: 92%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .new-tag {
                font-size: 14px;
                color: #fff;
                width: 55px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                background: #cf3d22;
                border-radius: 5px;
                display: inline-block;
                margin-left: 10px;
                vertical-align: top;
              }
            }

            .mid_con {
              display: flex;
              justify-content: space-between;

              .mid_left {
                font-size: 16px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #999999;
                line-height: 27px;

                img {
                  margin-right: 10px;
                }

                .left_blue {
                  color: #2055c9;
                }
              }

              .mid_mid {
                .rewards {
                  font-size: 16px;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #333333;
                }

                .amount {
                  font-size: 16px;
                  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                  margin-top: 5px;

                  .num {
                    font-size: 24px;
                    font-weight: bold;
                    color: #cf3d22;
                    margin-right: 10px;
                  }
                }
              }

              .mid_right {
                .distance {
                  font-size: 16px;
                  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                  font-weight: 400;
                  color: #333333;
                }

                .cash {
                  font-size: 16px;
                  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                  margin-top: 5px;

                  .num {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333333;
                    margin-right: 10px;
                  }
                }
              }
            }
          }

          .right_box {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: end;
            padding-bottom: 10px;

            .sure-btn {
              width: 154px;
              height: 40px;
              background: #2055c9;
              border-radius: 21px;
              border-color: #2055c9;
            }

            .is-disabled {
              background: #cbcbcb;
              border-color: #cbcbcb;
            }

            .no-qualification {
              width: 154px;
              text-align: center;
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #e12a05;
              float: right;
              margin-top: 5px;
            }

            .cashing-standard {
              clear: both;
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #333333;
              margin-top: 20px;

              .line {
                margin: 0 4px;
              }
            }
          }
        }
      }
    }
  }

  .qyzq {
    margin-bottom: 20px;

    .qyzq_box {
      overflow: hidden;

      .qyzq_item {
        margin-bottom: 20px;
        float: left;
        margin-right: 33px;
        color: #333;
        cursor: pointer;

        &:nth-of-type(4n) {
          margin-right: 0;
        }

        img {
          float: left;
          width: 170px;
          height: 120px;
        }

        .qyzq_text {
          float: right;
          width: 110px;
          height: 100%;
          line-height: 120px;
          color: #000000;
          font-size: 18px;
          font-weight: 400;
          text-align: center;
          background-color: #fbfbfd;
        }
      }
    }
  }
}

.ljsb-dialog {
  ::v-deep .el-dialog__header {
    border-bottom: 0.0625rem solid #e8e8e8;
    padding: 1.25rem 1.25rem 1.25rem;

    .el-dialog__title {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(0, 0, 0, 0.85);
    }

    .el-dialog__headerbtn {
      top: 25px;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #000;
    }
  }

  ::v-deep .el-dialog__body {
    padding: 20px 25px;
  }

  ::v-deep .el-dialog__footer {
    border-top: 0.0625rem solid rgba(0, 0, 0, 0.09);
    padding: 20px;
    text-align: end;
  }

  .ljsb_box {
    .title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }

    .title2 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 16px;
    }

    .title3 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 16px;

      .area {
        margin-left: 15px;
        color: #2055c9;
      }
    }

    .isAct {
      background-color: #2055c9 !important;
      color: #fff !important;

      img {
        filter: grayscale(100%) brightness(300%);
      }
    }

    .isActa {
      span {
        background-color: #2055c9 !important;
        color: #fff !important;
      }
    }

    .data_item {
      margin-top: 16px;
      height: 50px;
      line-height: 50px;
      // box-shadow: 0px 2px 20px 0px rgba(21, 66, 144, 0.6);
      border-radius: 5px;
      border: 1px solid #2055c9;
      // padding: 0 54px 0 60px;
      width: 368px;
      text-align: center;
      cursor: pointer;
      color: #2055c9;

      img {
        vertical-align: middle;
        margin-bottom: 6px;
        margin-right: 12px;
      }
    }

    .data_item2 {
      width: 120px;
      height: 40px;
      line-height: 40px;
      background: #ffffff;
      border-radius: 5px;
      border: 1px solid #d1dce5;
      text-align: center;
      display: inline-block;
      margin: 12px 10px 0 0;
      cursor: pointer;

      &:nth-child(6n) {
        margin-right: 0;
      }
    }

    .data_item3 {
      // width: 120px;

      span {
        padding: 0 28px;
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #d1dce5;
        text-align: center;
        display: inline-block;
        margin-top: 12px;
        cursor: pointer;
      }
    }
  }

  .dialog-footer {
    .el-button {
      width: 5.625rem;
      height: 2rem;
    }

    .close {
      &:hover {
        color: #606266;
        border-color: #dcdfe6;
        background-color: #fff;
      }
    }

    .el-button--primary {
      background-color: #2055c9;
      border-color: #2055c9;
    }
  }
}
/* 政策层级样式 */
.level {
  display: flex;
  margin-top: 30px;
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    margin-right: 10px;
  }
  .txt {
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    margin-right: 20px;
    cursor: pointer;
  }
}
.title-sele {
  color: white;
  background-color: #2f57d0;
  border-radius: 5px;
}
/*定义整个滚动条高宽及背景：高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #555;
}
</style>