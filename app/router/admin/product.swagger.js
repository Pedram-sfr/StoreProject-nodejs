// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          Color:
//  *              type: array
//  *              items: 
//  *                  type: string
//  *                  enum:
//  *                      -   black
//  *                      -   white
//  *                      -   gray                
//  *                      -   red
//  *                      -   blue
//  *                      -   green
//  *                      -   orange
//  *                      -   purple
//  */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount    
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags:
 *              -   Product(admin)
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          
 *          responses:
 *              201:
 *                  description: created new Product
 */
/**
 * @swagger
 *  /admin/products/get-all:
 *      get:
 *          tags:
 *              -   Product(admin)
 *          summary: get all product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags:
 *              -   Product(admin)
 *          summary: get product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: ObjectID for Product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags:
 *              -   Product(admin)
 *          summary: delete product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: ObjectID for Product
 *          responses:
 *              200:
 *                  description: success
 */