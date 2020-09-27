class RequestCode {
  //请求状态CODE码
  static CODE = {
    SUCCESS: {
      OK: 200,
      CREATED: 201,
      DELETE: 204
    },
    FAIL: {
      INVALID_REQUEST: 400, //用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的
      UNAUTHORIZED: 401, //TOKEN失效
      FORBIDDEN: 403, //权限不足
      NOT_FOUND: 404,
      GONE: 410, //用户请求的资源被永久删除，且不会再得到的
      OVERLOAD: 413, //请求体过大
      UNPROCESABLE_ENTITY: 422, //请求参数错误
      INTERNAL_SERVER_ERROR: 500 //服务器错误
    }
  }
}
export default RequestCode