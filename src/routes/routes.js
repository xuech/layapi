import combineRoutes from 'koa-combine-routers'

import publicRouter from './modules/publicRouter'
import loginRouter from './modules/loginRouter'
import userRouter from './modules/userRouter'

export default combineRoutes(publicRouter,loginRouter,userRouter)
