import Router from 'koa-router'
import loginController from '../api/LoginController'

const router = new Router()

router.prefix('/login')
// 登录接口
router.post('/login', loginController.login)

export default router