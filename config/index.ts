/**
 * 默认配置
 */
const dbUri = 'mongodb://localhost:27017/realworld'
const jwtSecret = '13a054c8-39ea-11eb-adc1-0242ac120002' //此处使用一个随机UUID来作为secret
const sessionSecret = '019075ec-1dc2-7542-a590-c7aa65b2e05a' // 通过uuid generater生成一个随机的secret

export {
  dbUri,
  jwtSecret,
  sessionSecret
}
