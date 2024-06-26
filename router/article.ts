/* 文章相关的路由 */
import express from "express"
import { article as articleCtrl } from "../controller"
import { articleValidator } from "../validator"
import { authMiddware } from "../middleware"



const router = express.Router()

// 获取文章列表
router.get('/', articleCtrl.getArticles)

// 获取用户关注的作者文章列表
router.get('/feed', articleCtrl.getFeedArticles)

// 通过ID获取文章
router.get('/:articleId', articleValidator.getArticleById, articleCtrl.getArticleById)

// 创建文章
router.post('/', authMiddware.tokenVerify, articleValidator.createArticle, articleCtrl.createArticle)

// 更新文章
router.put('/:articleId', authMiddware.tokenVerify, articleValidator.updateArticle, articleCtrl.updateArticle)

// 删除文章
router.delete('/:articleId', authMiddware.tokenVerify, articleValidator.deleteArticle, articleCtrl.deleteArticle)

// 添加文章评论
router.post('/:articleId/comments', articleCtrl.createArticleComment)

// 获取文章评论列表
router.get('/:articleId/comments', articleCtrl.getArticleComments)

// 删除文章评论
router.delete('/:articleId/comments/:id', articleCtrl.deleteArticleComment)

// 文章点赞
router.post('/:articleId/favorite', articleCtrl.favoriteArticle)

// 取消文章点赞
router.delete('/:articleId/favorite', articleCtrl.unfavoriteArticle)

export default router
