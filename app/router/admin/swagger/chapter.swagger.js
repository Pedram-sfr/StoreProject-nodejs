/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title       
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 65c4f660471307eba765a211
 *                  title: 
 *                      type: string
 *                      example: chapter 1 zero - hero javascript
 *                  text: 
 *                      type: string
 *                      example: the describe about this chapter
 *          EditChapter:
 *              type: object     
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: chapter 1 zero - hero javascript
 *                  text: 
 *                      type: string
 *                      example: the describe about this chapter
 */


/**
 * @swagger
 *  definitions:
 *      chaptersOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:                 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties: 
 *                              _id: 
 *                                  type: string
 *                                  example: 6279e994c1e47a98d0f356d3
 *                              title: 
 *                                  type: string
 *                                  example: title of course
 *                              chapters: 
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{_id: '6279e994c1e47a98d0f356d3', title: "title of chapter", text: "evvdvd"}]
 */


/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(admin)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(admin)]
 *          summary: get Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/chaptersOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [Chapter(admin)]
 *          summary: remove Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/update/{chapterID}:
 *      patch:
 *          tags: [Chapter(admin)]
 *          summary: update Chapter of courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */