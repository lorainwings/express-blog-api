import express from 'express'
import morgan from "morgan"
import cors from "cors"
import router from "./router"
import errorHandler from './middleware/error-handler'
import './model'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
