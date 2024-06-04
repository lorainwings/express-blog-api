/* 标签相关的路由 */
import express from "express"
import { tag as tagCtrl } from "../controller"
const router = express.Router()

// 获取文章标签列表
router.get('/', tagCtrl.getTags)

export default router
