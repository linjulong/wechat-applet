import RequestModel from './request/request'

class UserModel extends RequestModel {
  constructor() {
    super()
  }

  index() {
    return this.getRequest({
      url: 'user/index'
    })
  }

  getPhone(data) {
    return this.postRequest({
      url: 'user/getPhone',
      data: data
    })
  }

  updateUserInfo(data) {
    return this.postRequest({
      url: 'user/updateUserInfo',
      data: data
    })
  }
}

export default UserModel