/**
 * @swagger
 *  tags: 
 *      name: Developer-Routes
 *      description: DEveloper utils
 */
/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hashData with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: random number
 *          responses:
 *              200:
 *                  description: success
 *          
 */