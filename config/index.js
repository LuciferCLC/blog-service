const argv = require('yargs').argv

exports.MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/my_blog`,
  username: argv.db_username || 'DB_username',
  password: argv.db_password || 'DB_password'
}

exports.QINIU = {
  accessKey: argv.qn_accessKey || '-9uQ2N6VE0xIms22cgjP8iS3hUaQ-V9xEubCJymy',
  secretKey: argv.qn_secretKey || 'MksBKtjhXNa9Hljqqo-JdnXcxRi-QxF9rDD0Wx92',
  bucket: argv.qn_bucket || 'myblog',
  origin: argv.qn_origin || 'http://myblog.u.qiniudn.com',
  uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
}

exports.AUTH = {
  jwtTokenSecret: argv.auth_key || 'my_blog',
  defaultUsername: argv.auth_default_username || 'nolan',
  defaultPassword: argv.auth_default_password || 'ln222555'
}

exports.EMAIL = {
  account: argv.EMAIL_account || 'your_email_account',
  password: argv.EMAIL_password || 'your_email_password'
}

exports.BAIDU = {
  site: argv.baidu_site || 'your_baidu_site',
  token: argv.baidu_token || 'your_baidu_token'
}

exports.APP = {
  ROOT_PATH: '/api',
  LIMIT: 16,
  PORT: 8000
}

exports.INFO = {
  name: 'by_blog',
  version: '1.0.0',
  author: 'nolan',
  site: 'http://nolan.cc',
  powered: ['Vue2', 'Nuxt.js', 'Node.js', 'MongoDB', 'koa', 'Nginx']
}
