/**
 * @swagger
 *  tags: 
 *      name: AdminPanel
 *      description: Admin panel For Manage Data
 */
/**
 * @swagger
 *  /admin/category/add-cat:
 *      post:
 *          tags: [AdminPanel]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  name: title
 *                  required: true
 *              -   in: formData
 *                  type: string
 *                  name: parent
 *                  required: false
 *          responses:
 *              201:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/get-parents:
 *      get:
 *          tags: [AdminPanel]
 *          summary: get all parent of category
 *          responses:
 *              200:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/get-child/{parent}:
 *      get:
 *          tags: [AdminPanel]
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
 *          tags: [AdminPanel]
 *          summary:  get all categories
 *          responses:
 *              200:
 *                  description: success
 *          
 */
/**
 * @swagger
 *  /admin/category/remove-cat/{id}:
 *      delete:
 *          tags: [AdminPanel]
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