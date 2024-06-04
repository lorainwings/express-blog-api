import type { NextFunction } from 'express'
import { validationResult, buildCheckFunction } from 'express-validator'
import { isValidObjectId as isObjectId } from 'mongoose'


export default (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

export const isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async value => {
    if (!isObjectId(value)) {
      return Promise.reject('ID 不是一个有效的 ObjectID')
    }
  })
}
