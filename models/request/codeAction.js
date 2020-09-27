import RequestCode from './requestCode.js';
let failCode = RequestCode.CODE.FAIL;

import {
  removeCache
} from '../../utils/cache'
import {
  login
} from '../../utils/index.js'

export default function codeAction(code) {
  switch (code) {
    case failCode.INVALID_REQUEST: //400
      wx.showToast({
        title: '请求有误',
        icon: 'none'
      })
      break;
    case failCode.UNAUTHORIZED: //401
      removeCache('token')
      //重新执行登录流程
      wx.showToast({
        title: '身份信息失效',
        icon: 'none',
        duration: 1500
      })
      setTimeout(async() => {
        wx.showLoading({
          title: '重新登录中...',
        })
        await login();
        wx.hideLoading()
      }, 1800)
      break;
    case failCode.FORBIDDEN: //403
      wx.showToast({
        title: '权限不足',
        icon: 'none'
      })
      break;
    case failCode.NOT_FOUND: //404
      wx.showToast({
        title: '资源走丢了',
        icon: 'none'
      })
      break;
    case failCode.GONE: //410
      wx.showToast({
        title: '资源不存在',
        icon: 'none'
      })
      break;
    case failCode.OVERLOAD: //413
      wx.showToast({
        title: '请求体过大',
        icon: 'none'
      })
      break;
    case failCode.UNPROCESABLE_ENTITY: //422
      wx.showToast({
        title: '参数错误',
        icon: 'none'
      })
      break;
    case failCode.INTERNAL_SERVER_ERROR: //500
      wx.showToast({
        title: '服务器出错',
        icon: 'none'
      })
      break;
    default:
      wx.showToast({
        title: '不知名错误',
        icon: 'none'
      })
  }
}