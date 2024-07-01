import { validationResult, buildCheckFunction } from 'express-validator'
import { isValidObjectId as isObjectId } from 'mongoose'


export const createValidate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

export const isValidObjectId = (place, fields) => {
  // 使用自定义检查函数buildCheckFunction
  // buildCheckFunction第一个参数是需要校验哪个位置的数据, 可以是body, query...
  return buildCheckFunction(place)(fields).custom(async value => {
    if (!isObjectId(value)) {
      return Promise.reject('ID 不是一个有效的 ObjectID')
    }
  })
}
