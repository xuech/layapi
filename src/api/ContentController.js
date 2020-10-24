import User from "../model/User";

class ContentController {
    getPostList (ctx) {
        ctx.body = {
            code: 200,
            data: {
                title: 'xch'
            },
            msg: '获取文章列表成功',
            total: 1
        }
    }

}