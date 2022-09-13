/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 목록 가져오기
 *     tags: [starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          _id:
 *                              type: string
 *                              example: 63201607a80034be9372e750
 *                          name:
 *                              type: string
 *                              example: 나이트로 바닐라 크림
 *                          image:
 *                              type: string
 *                              example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000002487]_20210426091745467.jpg
 *                          __v:
 *                              type: integer
 *                              example: 0
 *
 *
 *
 *
 *
 *
 *
 */
