// import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config'
import { checkCode } from "../common/Utils";
import User from "../model/User";

class LoginController {
    constructor() {}
    async login (ctx) {
        const { body } = ctx.request

        //1、从redis中查找code和sid和用户传递过来的是否一致
        const code = body.code
        console.log(code);
        const sid = body.sid
        const res = await checkCode(sid, code)
        if (res) {
            //2、校验用户名和密码和数据库中是否一致
            let user = await User.findOne( { username: body.username })
            if (user.password === body.password) {
                //3、生成token并返回客户端
                let token = jsonwebtoken.sign({ _id: 'brian' }, config.JWT_SECRET, {
                    expiresIn: '1d'
                })
                ctx.body = {
                    code: 200,
                    token: token,
                    msg: '登录成功'
                }
            } else {
                ctx.body = {
                    code: 404,
                    msg: '用户名或密码错误'
                }
            }
        } else {
            ctx.body = {
                code: 401,
                msg: '图片验证码错误！'
            }

        }
    }
}
export default new LoginController()