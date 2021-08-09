import { Router } from "express";

export const router = Router();

/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *     description: return token,user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.post('/', function(req, res, next) {

    if(!(req.body.loginid && req.body.password)) {
        throw new Error('Invalid value')
    }
    if(req.body.loginid == "user" && req.body.password == "password") {
        req.session.token = 'token1234'
        req.session.userId = req.body.loginid
        console.log('sessiontoken='+ req.session.token)
        console.log('sessionID='+ req.sessionID)
        res.status(200).send({token: req.session.token, user:{userId: req.body.loginid}})
        next();
    } else {
        throw new Error('Invalid value')
    }
});

export default router;