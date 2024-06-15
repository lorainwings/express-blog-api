import { verify } from '../util/jwt'
import { jwtSecret } from '../config'
import { User } from '../model'

export const tokenVerify = async (req, res, next) => {
  // 从请求头获取 token 数据
  let token = req.headers.authorization
  token = token
    ? token.split('Bearer ')[1]
    : null

  if (!token) {
    return res.status(401).json({
      message: '请提供 token 信息'
    })
  }

  try {
    const decodedToken: any = await verify(token, jwtSecret)
    req.user = await User.findById(decodedToken.userId)
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'token 无效或已过期'
    })
  }

  // 验证 token 是否有效
  // 无效 -> 响应 401 状态码
  // 有效 -> 把用户信息读取出来挂载到 req 请求对象上
  //        继续往后执行
}
