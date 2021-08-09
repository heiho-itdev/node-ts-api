import { exception } from "console"
import { Router } from "express"

export const router = Router()

/**
 * @swagger
 * paths:
 *  /auth/logout:
 *   post:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.post('/logout', function(req, res, next) {
    //session消す
    console.log('--------------')
    // console.log(req.headers)
    req.session.userId = null
    req.session.token = null
    req.session._csrf = null
    console.log('--------------')
    res.status(200).send({})
    next()
})

/**
 * @swagger
 * paths:
 *  /auth/me:
 *   get:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.get('/me', function(req, res, next) {

    //ヘッダーのトークン確認
    if(!req.headers.authorization || !req.session.userId) {
        throw new Error('Invalid value')
    }
    console.log('sessiontoken='+ req.session.token)
    console.log('sessionID='+ req.sessionID)
    res.status(200).send({token: req.session.token, user:{userId:req.session.userId}})
    next()
})
export default router;