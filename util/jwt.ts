import jwt from 'jsonwebtoken'
import { promisify } from 'util'

type VerifyType = (...args: Parameters<typeof jwt.verify>) => Promise<jwt.SignCallback>

export const sign: any = promisify(jwt.sign)

export const verify: VerifyType = promisify(jwt.verify)

export const decode = promisify(jwt.decode)
