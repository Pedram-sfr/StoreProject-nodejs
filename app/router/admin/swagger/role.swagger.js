
/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "62822e4ff68cdded54aa928d"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "desc of permission"
 *                                          
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the title of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for role
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the title of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for role
 */
/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(admin)]
 *          summary: get all Role      
 *          responses:
 *              200:
 *                  description: get all Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 * 
 */
/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(admin)]
 *          summary: create new Role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          
 *          responses:
 *              201:
 *                  description: created new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(admin)]
 *          summary: edit the Role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Role'
 *          
 *          responses:
 *              200:
 *                  description: edited the Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags: [RBAC(admin)]
 *          summary: remove the Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          
 *          responses:
 *              200:
 *                  description: remove the Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
