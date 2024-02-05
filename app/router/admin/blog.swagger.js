/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 


/**
 * @swagger
 *  /admin/blogs/:
 *      get:
 *          tags: 
 *              -   Blog(admin)
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: 
 *              -   Blog(admin)
 *          summary: get blog and populate with id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/blogs/create-blog:
 *      post:
 *          tags: 
 *              -   Blog(admin)
 *          summary: create blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/blogs/update-blog/{id}:
 *      patch:
 *          tags: 
 *              -   Blog(admin)
 *          summary: update blog document buy id
 *          comsumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/blogs/remove-blog/{id}:
 *      delete:
 *          tags: 
 *              -   Blog(admin)
 *          summary: get blog and populate with id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */