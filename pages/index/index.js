import UserModel from "../../models/user"
import RequestCode from "../../models/request/requestCode"
const user = new UserModel()
const app = getApp();

Page({
  data: {},

  async onLoad() {
    if (app.globalData.hasLogin) {
      this.getUserInfo();
    } else {
      app.checkLoginReadyCallback = () => {
        this.getUserInfo();
      };
    }
  },
  async getUserInfo() {
    let [err, userRes] = await app.globalData.to(user.index());
    console.log(err, userRes)
  },
  async getPhoneNumber(e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      const {
        iv,
        encryptedData
      } = e.detail;
      const userRes = await user.getPhone({
        encryptedData,
        iv
      })
      console.log(userRes)
    }
  }
})