import Message from "element-ui/packages/message/src/main"

function ResponseError(message, errCode) {
  this.name = 'ResponseError'
  this.error_code = errCode
  this.message = message || 'response error'
  this.stack = (new Error()).stack
}

ResponseError.prototype = Object.create(Error.prototype)
ResponseError.prototype.constructor = ResponseError

const statusMap = {
  0: '请求数据失败',
  400: '请求数据失败',
  401: '登录状态过期,需重新登录',
  403: '未取得访问权限',
  404: '请求的地址不存在',
  405: '请求的方法不存在',
  422: '提交的数据格式不正确',
  429: '操作太频繁了, 歇息一会吧',
  500: '服务器开小差了',
}

export default function ({ $axios, redirect, store, route }) {
  let token = store.state.user.authToken
  token && $axios.setToken(token, 'Bearer')

  $axios.onRequest(config => {
  })

  $axios.onRequestError(error => {
    // console.log('onRequestError', error)
  })

  $axios.onResponse(response => {
    if (response.status === 200 && response.data.success) {
      return response.data.data
    }

    throw new ResponseError(response.data.message, response.data.error_code)
  })

  $axios.onError(error => {
    let code, msg, errorMessage

    if (error.name === "ResponseError") {
      msg = error.message
    } else {
      code = parseInt(error.response ? error.response.status : 0)
      msg = statusMap[code]
      errorMessage = code === 422 ? error.response.data.errors : null

      if (error.message) {
        msg = `${msg}: ${error.message}`
      }

      // hack editor 图片上传
      if (error.response && error.response.data && error.response.data.error) {
        msg = `${msg}: ${error.response.data.error}`
      }
    }

    Message.closeAll()

    Message({
      dangerouslyUseHTMLString: true,
      type: 'error',
      duration: 3000,
      customClass: 'axios-error',
      message: errorMessage ?
        `<p>提交的数据格式不正确:</p><p style="padding-top: 10px">${errorMessage}</p>` :
        `<p>${msg}</p>`
    })

    if (code === 401) {
      $axios.setToken(false)
      store.commit('user/logout')
      redirect('/auth/login')
    }
  })
}
