/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOtp:
 *              type: object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the user phone for signup/signin
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: them user phone for signup/signin
 *                  code:
 *                      type: integer
 *                      description: top code
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: send refresh token
 */

/**
 * @swagger
 * tags:
 *  name: UserPanel
 *  description: User panel API
 */
/**
 * @swagger
 * /user/get-otp:
 *  post:
 *      summary: login in user panel with phone number
 *      tags: [UserPanel]
 *      description: OTP login
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOtp'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOtp'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: InternalServerError
 */
/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      summary: check otp
 *      tags: [UserPanel]
 *      description: check otp and expire date
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOtp'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOtp'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: InternalServerError
 */
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      summary: send refresh token
 *      tags: [UserPanel]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: InternalServerError
 */