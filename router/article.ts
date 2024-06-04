/* 文章相关的路由 */
import express from "express"
import { article as articleCtrl } from "../controller"

const router = express.Router()

// 获取文章列表
router.get('/', articleCtrl.getArticles)

// 获取用户关注的作者文章列表
router.get('/feed', articleCtrl.getFeedArticles)

// 获取文章
router.get('/:slug', articleCtrl.getArticle)

// 创建文章
router.post('/', articleCtrl.createArticle)

export default router
