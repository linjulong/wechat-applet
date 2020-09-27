import RequestModel from './request/request'

class BaseModel extends RequestModel {
  constructor() {
    super()
  }

  login(code) {
    return this.postRequest({
      url: 'base/login',
      data: {
        code
      }
    })
  }
}

export default BaseModel