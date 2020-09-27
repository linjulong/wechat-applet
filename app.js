//app.js
const to = require('await-to-js').default;
import {
  wxp,
  checkUpdateApp,
  login
} from './utils/index'
import {
  setCache
} from './utils/cache'

import UserModel from "./models/user.js";
const user = new UserModel();

App({
  async onLaunch() {
    checkUpdateApp();
    this.setPromiseForWXApi()
    await this.checkSession();
    this.updateUserInfo();
  },
  globalData: {
    //全局数据管理
    wxp: {}, //全局微信api-Promise化管理器
    userInfo: {},
    hasLogin: false,
    to
  },

  /**
   * @description 设置全局promise化微信小程序api
   */
  setPromiseForWXApi() {
    this.globalData.wxp = wxp;
  },
  async checkSession() {
    const [sessionErrMsg, sessionOK] = await to(this.globalData.wxp.checkSession());
    if (sessionOK) {
      const sessionErrMsg = await this.globalData.wxp.checkSession();
      this.globalData.hasLogin = true;
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
      console.log('session未过期')
      //session未过期 直接拉取用户业务数据
    } else {
      this.globalData.wxp.showLoading({
        title: '登录中...'
      });
      await login();
      this.globalData.hasLogin = true;
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
      this.globalData.wxp.hideLoading();
    }
  },
  async updateUserInfo() {
    const setting = await this.globalData.wxp.getSetting();
    if (setting.authSetting['scope.userInfo']) {
      const res = await this.globalData.wxp.getUserInfo({
        lang: 'zh_CN'
      });
      this.globalData.userInfo = res.userInfo;
      user.updateUserInfo(res.userInfo);
      //网络延迟，回调函数
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
    }
  }
})