import { body, param } from 'express-validator'
import { validateMiddware } from '../middleware'
import { Article } from '../model'

const { createValidate, isValidObjectId } = validateMiddware

export const createArticle = createValidate([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.description').notEmpty().withMessage('文章摘要不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空')
])

export const getArticle = createValidate([
  isValidObjectId(['params'], 'articleId')

  /* 此时是验证query参数(/:articleId), 因此只能使用param函数 */
  // param('articleId').custom(async value => {
  //   if (!mongoose.isValidObjectId(value)) {
  //   返回一个失败状态的 Promise

  /*   异步错误情况, 返回reject */
  //   return Promise.reject('文章ID类型错误')

  /*   同步失败情况: 返回一个错误 */
  //   throw new Error('文章ID类型错误')
  // }

  /*    同步成功情况：返回boolean值true */
  //    return true
  // })
])

export const updateArticle = [
  createValidate([
    isValidObjectId(['params'], 'articleId')
    // param('articleId').isValidObjectId()
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    req.article = article
    if (!article) {
      return res.status(404).end()
    }
    next()
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end()
    }
    next()
  }
]

export const deleteArticle = updateArticle
