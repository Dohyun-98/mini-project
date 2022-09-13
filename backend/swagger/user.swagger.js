/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원목록 가져오기
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          og:
 *                              type: object
 *                              properties:
 *                                  title :
 *                                     type : string
 *                                     example: 네이버
 *                                  description :
 *                                     type : string
 *                                     example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요.
 *                                  image :
 *                                     type : string
 *                                     example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 *                          user_id:
 *                              type: string
 *                              example: 63201d34d50f3006d52b2459
 *                          email:
 *                              type: string
 *                              example: test@email.com
 *                          personal:
 *                              type: string
 *                              example: 000102-*******
 *                          prefer:
 *                              type: string
 *                              example: www.naver.com
 *                          pwd:
 *                              type: string
 *                              example: '12313'
 *                          phone:
 *                              type: string
 *                              example: '01045099894'
 *                          __v:
 *                              type: integer
 *                              example: 0
 *
 *
 *
 *
 *
 *
 */
/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 가입
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              personal:
 *                type: string
 *              prefer:
 *                type: string
 *              pwd:
 *                type: string
 *              phone:
 *                type: string
 *            example:
 *               name: '김도현'
 *               email: 'rlaehgus@naver.com'
 *               personal: 940323-1111111
 *               prefer: 'naver.com'
 *               pwd: '12345'
 *               phone: '01022222222'
 *     responses:
 *          200:
 *              description: 성공
 *          422:
 *              description: "에러!! 핸드폰 번호가 인증되지 않았습니다."
 */
