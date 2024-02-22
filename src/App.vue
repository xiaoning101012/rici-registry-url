<template>
  <div id="app">
    <Aside></Aside>

    <router-view />
  </div>
</template>
<script>
export default {
  beforeCreate () {
    $.ajax({
      type: "get",
      async: false,
      dataType: "jsonp",
      jsonpCallback: "jsonpCallback",
      contentType: "application/json; charset=utf-8",
      url: "https://www.sczwfw.gov.cn/juspace/interface/auth/curMemberCro",
      success: (result) => {
        var isLogin = result.success;
        if (isLogin) {
          console.log("已登录");
          this.$store.commit("SET_USERINFO", result.data.curMember)
        } else {
          console.log("未登陆")
        }
      }
    });
  },
  created () {
  },
  mounted () {

  }
}
</script>
