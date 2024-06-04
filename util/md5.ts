import crypto from 'crypto'

export default (str: string) => {
  return crypto.createHash('md5')
    .update('lagou' + str)
    .digest('hex')
}
