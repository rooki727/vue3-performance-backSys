// 使用代理，解决接口不通过服务报错的问题
// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const history = require('connect-history-api-fallback')
// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require('http-proxy-middleware')

// 创建一个 Express 应用
const app = express()

// 设置 API 代理
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://localhost:9000/api', // 这里需要替换为你的 API 服务器地址
    changeOrigin: true,
    pathRewrite: {
      '^/api': '' // 如果 API 服务器的路径不需要 '/api' 前缀，就用这个规则去掉
    }
  })
)
app.use(express.static('dist'))
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
)
// 设置静态文件服务，将 dist 目录作为静态资源目录
app.use(express.static('dist'))

// 启动 Express 服务器
app.listen(9000, () => {
  console.log('服务器启动成功！')
})

// 自动打开浏览器
// eslint-disable-next-line no-undef
const { exec } = require('child_process')
exec('start http://localhost:9000')
