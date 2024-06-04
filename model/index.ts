/* model: 数据持久层 */
import mongoose from 'mongoose'
import { dbUri } from '../config'
import userModel from './user'
import articleModel from './article'

// 连接 MongoDB 数据库
mongoose.connect(dbUri)

const db = mongoose.connection

// 当连接失败的时候
db.on('error', (err: Error) => {
  console.log('MongoDB 数据库连接失败', err)
})

// 当连接成功的时候
db.once('open', function () {
  console.log('MongoDB 数据库连接成功')
})

const User: any = mongoose.model('User', userModel)
const Article = mongoose.model('Article', articleModel)


// 组织导出模型类
export { User, Article }
