import crypto from 'crypto'

export default (str: string) => {
  return crypto.createHash('md5')
    // 加盐(可以拼固定字符串, 也可以将结果再次md5)
    .update('ThisIsSalt:' + str)
    // 十进制
    .digest('hex')
}
