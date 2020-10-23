// import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'

class LoginController {
    constructor() {}
    async login (ctx) {
        const { body } = ctx.request
        //1、生成token
        let token = jsonwebtoken.sign({ _id: 'brian' }, config.JWT_SECRET, {
          expiresIn: '1d'
        })
        ctx.body = {
          code: 200,
          token: token
        }

    }
}
export default new LoginController()