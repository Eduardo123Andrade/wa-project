/**
  * @swagger
  * tags:
  *   name: Laboratory
  *   description: Laboratory manager API
  */


/**
 * @swagger
 * /create-laboratories:
 *   post:
 *     summary: Return the list of created laboratories
 *     tags: [Laboratory]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                      $ref: '#/components/schemas/CreateLaboratories'
 *     responses:
 *         201:
 *             description: Created new Laboratory successfully
 *             content:
 *                 application/json:
 *                   schema:
 *                     $ref: '#/components/schemas/Laboratories'
 *         400:
 *              description: Validation error
 */

/**
 * @swagger
 * /delete-laboratories:
 *  delete:
 *   summary: Return the list of deleted laboratories
 *   tags: [Laboratory]
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                $ref: '#/components/schemas/LaboratoriesToDelete'
 *             
 * 
 *   responses:
 *      200:
 *          description: The list of deleted books
 *          content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/LaboratoriesWithoutIds'
 *
 *      400:
 *           description: Validation error
 *
 *      403:
 *          description: There not valid laboratory to delete
 *
 */

/**
 * @swagger
 * /list-activated-laboratory:
 *  get:
 *   summary: Return the list of actives laboratories
 *   tags: [Laboratory]
 *   responses:
 *      200:
 *        description: The list of actives Laboratories
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Laboratories'
 *
 */

/**
 * @swagger
 * /update-laboratories:
 *  put:
 *   summary: Return the list of updated laboratories
 *   tags: [Laboratory]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *              $ref: '#/components/schemas/LaboratoriesToUpdate'
 *
 *
 *   responses:
 *      200:
 *        description: The list of updated laboratories
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Laboratories'
 *
 *      403:
 *          description: There not valid laboratory to update
 *
 */