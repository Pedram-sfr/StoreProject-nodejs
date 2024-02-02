/**\
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
 *      parameters:
 *          -   name: phone
 *              in: formData
 *              required: true
 *              type: string
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
 *      parameters:
*          -   name: phone
*              in: formData
*              required: true
*              type: string
*          -   name: code
*              in: formData
*              required: true
*              type: string
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
 *      parameters:
 *          -   in: body
 *              required: true
 *              type: string
 *              name: refreshToken
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