import bcrypt from 'bcrypt'
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
            let checkRes = await bcrypt.compare(body.password, user.password)
            if (checkRes) {
                const userObj = user.toJSON()
                const arr = ["password", "username"]
                arr.map((item) => {
                    delete userObj[item]
                })
                //3、生成token并返回客户端
                let token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, {
                    expiresIn: '1d'
                })
                ctx.body = {
                    code: 200,
                    data: {
                        ...userObj
                    },
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

    async reg (ctx) {
        const { body } = ctx.request
        //1、从redis中查找code和sid和用户传递过来的是否一致
        const code = body.code
        const sid = body.sid
        let msg = {}
        const res = await checkCode(sid, code)
        let check = true
        if (res) {
            //2、查库，看username是否被注册
            let user1 = await User.findOne( { username: body.username })
            if (user1 !== null && typeof user1.username !== 'undefined') {
                msg.username = ['此邮箱已经注册，可以通过邮箱找回密码']
                check = false
            }

            const user2 = await User.findOne({ name: body.name })
            // 查库，看name是否被注册
            if (user2 !== null && typeof user2.name !== 'undefined') {
                msg.name = ['此昵称已经被注册，请修改']
                check = false
            }
            if (check) {
                let password = await bcrypt.hash(body.password, 5)
                const user = new User({
                    username: body.username,
                    name: body.name,
                    password: password
                    // created: moment().format('YYYY-MM-DD HH:mm:ss')
                })
                const result = await user.save()
                ctx.body = {
                    code: 200,
                    result: result,
                    msg: '注册成功'
                }
                return 
            }
        } else {
            msg.code = ['验证码已经失效，请重新获取！']
        }
        ctx.body = {
            code: 500,
            msg: msg
        }
    }
}
export default new LoginController()