import { body } from 'express-validator'
import { createValidate } from '../middleware'
import { User } from '../model'
import md5 from '../util/md5'

// 通过validate([])的方式, 每一项的验证器都会被执行, 即使前一项验证失败也不会停止后续的验证
export const register = createValidate([
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),

  body('user.password').notEmpty().withMessage('密码不能为空'),

  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail()
    .custom(async email => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    })
])

// 配置为数组的格式, 只有数组前一项通过后才会进行下一步验证, 直到所有元素的验证全部通过才会执行路由函数
// 这也是利用了中间件的特性, 中间件是一个数组的情况, 可以实现多个中间件的串联功能
export const login = [
  createValidate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  createValidate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email })
        .select(['email', 'username', 'bio', 'image', 'password'])
      if (!user) {
        return Promise.reject('用户不存在')
      }

      // 将数据挂载到请求对象中，后续的中间件也可以使用了
      req.user = user
    })
  ]),
  createValidate([
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ])
]
