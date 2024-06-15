/* 用户相关的路由 */
import express from "express"
import { user as userCtrl } from "../controller"
import { userValidator } from "../validator"
import { authMiddware } from "../middleware"


const router = express.Router()

// 用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

// 用户注册
router.post('/users', userValidator.register, userCtrl.register)

// 获取当前登录用户(需认证的都需要加上authMiddware认证中间件)
router.get('/user', authMiddware.tokenVerify, userCtrl.getCurrentUser)

// 更新当前登录用户
router.put('/user', userCtrl.updateCurrentUser)

export default router
