import { Router } from "express";

export const router = Router();


/**
 * @swagger
 * /hello:
 *   get:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.get('/', function(req, res) {
    res.json({text:"hello"});
});

export default router;