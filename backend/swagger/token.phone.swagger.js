/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Token]
 *     requestBody:
 *      content:
 *       application/json:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *            example:
 *               phone : '01022222222'
 *     responses:
 *          200:
 *              description: 성공
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰 인증 완료
 *     tags: [Token]
 *     requestBody:
 *      content:
 *       application/json:
 *          schema:
 *            type: object
 *            properties:
 *              phone:
 *                type: string
 *              token:
 *                type: string
 *            example:
 *               phone : '01022222222'
 *               token : '123144'
 *     responses:
 *          200:
 *              description: true 일때 토큰인증성공, false일때 토큰인증실패
 */
