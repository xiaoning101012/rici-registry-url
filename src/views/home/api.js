import appRequest from '../../utils/appRequest'
// 获取热门政策列表
export function hotPolicyList(query) {
  return appRequest({
    url: '/policy/front/cy/zq/hot/policy',
    method: 'get',
    params: query,
  })
}

// 获取助企惠企主题一级菜单
export function getTypeOne(query) {
  return appRequest({
    url: '/policy/front/handling-guideline/list',
    method: 'get',
    params: query,
  })
}
// 获取助企惠企主题二级菜单
export function getTypeTwo(query) {
  return appRequest({
    url: '/policy/front/handling-guideline/page/list',
    method: 'get',
    params: query,
  })
}
// 获取政府日历
export function getPolicyDate(query) {
  return appRequest({
    url: '/policy/front/search/page/getDeclareItemPolicyStatisticsByCalendar',
    method: 'get',
    params: query,
  })
}

// 获取免申即享
export function getFree(query) {
  return appRequest({
    // url: '/zqsk/zstapi/zstapi/admin-enjoy-without-application/enjoyList',
    url: '/policy/front/enjoy/page/list',
    // method: 'POST',
    method: 'GET',
    params: query,

  })
}

// 政府自测工具
export function getToolOne(query) {
  return appRequest({
    url: '/zqsk/sczwfw/sczwfw/verify',
    method: 'get',
    params: query,
  })
}
export function getToolTwo(query) {
  return appRequest({
    url: '/zqsk/sczwfw/sczwfw/productSale',
    method: 'get',
    params: query,
  })
}
export function getToolThree(query) {
  return appRequest({
    url: '/zqsk/sczwfw/sczwfw/tax',
    method: 'get',
    params: query,
  })
}

//政策类型查询
export function getPolicyType(query) {
  return appRequest({
    url: '/policy/front/search/page/getLikePolicyByCode',
    method: 'get',
    params: query,
  })
}

//区域助企惠企专区
export function getCityList(query) {
  return appRequest({
    url: '/policy/front/attachment/list',
    method: 'get',
    params: query,
  })
}