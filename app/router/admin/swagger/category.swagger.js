/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger
 *  /admin/category/add-cat:
 *      post:
 *          tags: 
 *              -   Category(admin)
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/get-parents:
 *      get:
 *          tags: [Category(admin)]
 *          summary: get all parent of category
 *          parameters:
 *          responses:
 *              200:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/get-child/{parent}:
 *      get:
 *          tags: [Category(admin)]
 *          summary:  get all child of category parent
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: parent
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/all-cat:
 *      get:
 *          tags: [Category(admin)]
 *          summary:  get all categories
 *          responses:
 *              200:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/list-of-all-cat:
 *      get:
 *          tags: [Category(admin)]
 *          summary: get all category with out populate
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/get-cat/{id}:
 *      get:
 *          tags: [Category(admin)]
 *          summary: get category with id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/update-cat/{id}:
 *      patch:
 *          tags: [Category(admin)]
 *          summary: edit category title with id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 *          
 */
/**
 * @swagger
 *  /admin/category/remove-cat/{id}:
 *      delete:
 *          tags: [Category(admin)]
 *          summary: remove category with id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 *          
 */
