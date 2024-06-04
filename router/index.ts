/* router: 用于配置URL路由 */

import express from "express"
import userRouter from "./user"
import profileRouter from "./profile"
import articleRouter from "./article"
import tagRouter from "./tag"

const router = express.Router()

// 用户相关路由
router.use(userRouter)

// 用户资料路由
router.use('/profiles', profileRouter)

// 文章相关路由
router.use('/articles', articleRouter)

// 标签相关路由
router.use('/tags', tagRouter)


export default router
