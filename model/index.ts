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

// 初始化模型类, 约束了参数的结构和类型
const User = mongoose.model('User', userModel)
const Article = mongoose.model('Article', articleModel)

/*
  后续的操作可以实例化模型类来操作数据库, 例如:

  // 实例化
  const perple = new User({ username: 'xx', email: 'xx', password: 'xx', bio: 'xx', image: 'xx' });
  // 存入数据库
  await perple.save();
  // 在数据库中查找
  await User.find({ name: /^fluff/ });
*/


// 组织导出模型类
export { User, Article }
