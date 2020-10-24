import Router from 'koa-router'
import contentController from '../api/ContentController'

const router = new Router()

router.prefix('/content')
router.get('/list', contentController.getList)

export default router
