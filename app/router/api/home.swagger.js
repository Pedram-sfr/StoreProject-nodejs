/**\
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: index API 
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Index of Routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: notFound
 */