/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   chapterID
 *                  -   courseID
 *                  -   title       
 *                  -   text      
 *                  -   type       
 *                  -   video
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 65c4f660471307eba765a211
 *                  chapterID:
 *                      type: string
 *                      example: 65c644c52eb22e1efad6bb58
 *                  title: 
 *                      type: string
 *                      example: متغیر ها
 *                  text: 
 *                      type: string
 *                      example: در این قسمت انواع متغیرها در جاوا اسکریپت گفته شده است
 *                  type: 
 *                      type: string
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: متغیر ها
 *                  text: 
 *                      type: string
 *                      example: در این قسمت انواع متغیرها در جاوا اسکریپت گفته شده است
 *                  type: 
 *                      type: string
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      format: binary
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
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(admin)]
 *          summary: create new Episode of Chapter 
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */


/**
 * @swagger
 *  /admin/episode/update/{episodeID}:
 *      patch:
 *          tags: [Episode(admin)]
 *          summary: edit Episode of Chapter 
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: episodeID
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(admin)]
 *          summary: create new Episode of Chapter
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: episodeID
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

