import { User }  from '../model'
import * as jwt from '../util/jwt'
import { jwtSecret }  from '../config'

// 用户登录
export const login = async (req, res, next) => {
  try {
    // 1. 数据验证
    // 2. 生成 token
    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id // 不需要把所有用户数据拿来签名
    }, jwtSecret, {
      expiresIn: 60 * 60 * 24
    })

    // 3. 发送成功响应（包含 token 的用户信息）
    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch (err) {
    next(err)
  }
}

// 用户注册
export const register = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()

    // 将Mongoose模型数据转化为普通的JS数据
    user = user.toJSON()

    // @ts-ignore
    delete user.password

    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

// 获取当前登录用户
export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

// 更新当前登录用户
export const updateCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('updateCurrentUser')
  } catch (err) {
    next(err)
  }
}

// 获取指定用户资料
export const getUserProfile = async (req, res, next) => {
  try {
    // 处理请求
    res.send('getUserProfile')
  } catch (err) {
    next(err)
  }
}

// 关注用户
export const followUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('followUser')
  } catch (err) {
    next(err)
  }
}

// 取消关注用户
export const unfollowUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('unfollowUser')
  } catch (err) {
    next(err)
  }
}


// 用户注册(通过cookie)
export const registerByCookie = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()

    // 保持登录状态
    req.session.user = user

    // 将Mongoose模型数据转化为普通的JS数据
    user = user.toJSON()

    // @ts-ignore
    delete user.password

    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
}

// 用户登录(通过cookie)
export const loginByCookie = async (req, res, next) => {
  try {
    const user = req.user.toJSON()

    // 保持登录状态
    req.session.user = user

    delete user.password

    res.status(200).json({
      ...user
    })
  } catch (err) {
    next(err)
  }
}
