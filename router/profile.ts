/* 用户资料相关的路由 */
import express from "express"
const router = express.Router()

// 获取用户资料
router.post('/:username', async (req, res, next) => {
  try {
    res.send('post /profiles/:username')
  } catch (err) { next(err) }
})


// 关注用户
router.post('/:username/follow', async (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
})

// 取消关注用户
router.delete('/:username/follow', async (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch (err) {
    next(err)
  }
})


export default router
