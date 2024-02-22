import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      // "authenLevel": "RC03",
      // "employeeMobile": "181******76",
      // "encodeEmployeeMobile": "41baceeb1fc692afaef8e854fabea88f8df644edc4fafa090b38cf06c1f5ef2f517b13a3b314c8c2445a3908344f2ae80a51a8a6779d27d37a559c764797856e8b3da3042a91ef3b1b3ddf4430ac77141267c8dc30272e7c53c1dee3680dff1ea83cddaa7e22ea516a9231ebff7b22065ba053b9e4efef617afe462a0987672e",
      // "encodeIdNumber": "769fee1e35038fb09fdecd2ce498098e54193952d197652a09ef36094738be89580e489f195648f28948b48149634a4858227916201f9cb90b5c2f81c3847b6be87ff362179fac253ae26e50443d89bb796e7ed74076007f4de2982242d903ea65a949bfbc32cb847ad77bbe169d917024504d0a36152d2fa4024a3ac7a11116",
      // "encodeRealName": "63ce92a95fef770903b0d5fe52b0aa93de02478fb1d9cedb4ce8cb3750192d09493c1d8871b46f0e7fc47de002febc73646ab683a0aea195c08e679e84ea56f6fb487d8cdf22d4146a21d5b2567bc89b9420ccb8083eb7b37a72322b876cd948b042502265f45d7df4c1f70d947d72b18cd3ff1595ab187f920c45fbccbeb892",
      // "encryptKey": "04d77a0bae0ac0b0ebd58e1ffcfab81265fc8033a11afce36e176fac525445c576c7d663967391868605faad78701613b00577ebafd2ad3d394935613a039a9f989f59fc4b60d536ea59070a2577d023f4f58a1d70f602903e5cddee0b73b45dcaf06331e50715b65a0d201193ebc7a4f241d5c47ffb5ca7e1c61a4274f1029056b30b49ef",
      // "idNumber": "5****************9",
      // "realName": "*金川",
      // "sex": "1",
      // "type": "user",
      // "uuid": "18b92f5a-a8c3-4fba-949f-450049528281"
    },
    //   jj:{
    //     "authenLevel": "1",
    //     "employeeMobile": "134******84",
    //     "encodeEmployeeMobile": "1b3de701e784923f2ccd5b01b44d06cca47068750385804f39cf31b945d485ee8527a8f85c2510512aec16118f71fe3149927643ff0f0fdd601faa01799ec5938d265bfa4dbcb1cc387443251c7f87a3c47c753aa923104295891cc3e57c09e465e8aa929175817235d47af6c8d18434af6514791d415ae855f4ac229b3d9194",
    //     "encodeIdNumber": "45420167125866b8e00b219cd12531de453a86033c550d58e4e1e1fa4caa889d1aa5b1ef2b23a8f8ed766ddf180c0e38759deb74a162c1083e0b1442884b8e82367cbf5a961cfb76110763d7371989817068fea5d90220891f410dfde1dc58d0fbf162092f0b444b567ce1a261d7e492fc1e051fb92c026078635581e0e5e6a3",
    //     "encodeRealName": "60a1d1e255c1c3279173a5db64f6fffd4cc372d4e783cb0db5f2b7bffa19c3bc1f897a408f520d56b8118b53dc5fe70e9e1bc615b0663a0a50a3004b64bcb8f5e9c3ca13926a5e07bc5fcc7f4755fc80fdb1f89b2c3d0b70990c65c1ffd92dacfaa36706fb82f0a42985fcf81a65102f3882fca4e52b988cdaff40608fe362ef",
    //     "encodeSocialCreditCode": "33816b8b7fce2a90d527f7ac19bfea59225faa62abc98379bedee3dea3a1577452cac93630be6148301b5ad15666394f7d0e2ef508e61a6ddf91dc28c3be184913a82a2f025d11b9d9a41919f1939d83d4d4e6171881aec642bd015dadd5b8c07bada325bb475583d3f4d4e50c5e832c323e7ac480c270c9768983344d47daaf",
    //     "encryptKey": "04a90546391845502759dbba247302115d39fda66f64b9486c5eb377dd15e6c04c6834ed881e20a17948624aa5afc41acaa47d96a473cef5750a53eea04243ce0dd03928af03efe21a7d87c85b307d342732ea946bf6f571fa98defa365082b59d8a7a38b8653b2bf840",
    //     "idNumber": "5****************2",
    //     "realName": "*忠义",
    //     "sex": "",
    //     "socialCreditCode": "**************957D",
    //     "type": "manager",
    //     "uuid": "221653701"
    // }
  },
  mutations: {
    SET_USERINFO(state, paylod) {
      
      state.userInfo = paylod
    }
  },
  actions: {
  },
  modules: {
  }
})
