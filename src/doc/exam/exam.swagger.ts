/**
  * @swagger
  * tags:
  *   name: Exam
  *   description: Exam manager API
  */

/**
 * @swagger
 * /create-exams:
 *  post:
 *    summary: Create a list of exams
 *    tags: [Exam]
 *    requestBody:
 *        required: true
 *        content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateExams'
 *
 *    responses:
 *      200:
 *        description: The list of new Exams
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exams'
 *
 *      400:
 *           description: Validation error
 *
 */

/**
 * @swagger
 * /delete-exams:
 *  delete:
 *    summary: Return a list of deleted Exams
 *    tags: [Exam]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ExamsToDelete' 
 *    responses:
 *      200:
 *          description: The list of deleted books
 *          content:
 *             application/json:
 *               schema:
 *                  $ref: '#/components/schemas/ExamsWithoutId'
 *
 *      400:
 *           description: Validation error
 *
 *      403:
 *          description: There not valid laboratory to delete
 */

/**
 * @swagger
 * /list-activated-exam:
 *  get:
 *   summary: Return the list os actives exams
 *   tags: [Exam]
 *   responses:
 *    200:
 *      description: The list of actives exams
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Exams'
 */

/**
 * @swagger
 * /get-laboratories-by-exam-name/{examName}:
 *  get:
 *    summary: Return the list of laboratories associated a specified exam
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: examName
 *        schema: 
 *          type: string
 *        required: true
 *        description: Exam's name to search
 *    
 *    responses:
 *      200:
 *        description: List of associated laboratories
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Laboratories'
 *      
 *      404:
 *        description: Exam not found
 *
 *      400:
 *        description: Validation error
 */

/**
 * @swagger
 * /associate-the-exam-with-a-laboratory:
 *  put:
 *    summary: Return the exam with a new laboratory associated
 *    tags: [Exam]
 *    requestBody:
 *      required: true
 *      content:
 *        applications/json:
 *          schema:
 *            $ref: '#/components/schemas/AssociateAExamWithANewLaboratory'
 *    
 *    responses:  
 *      200:
 *        description: Exam with a new laboratory associated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exam'
 *     
 *      403:  
 *        description: Laboratory already associated OR Exam is inactive OR Laboratory is inactive
 *     
 *      404:
 *        description: Exam not found OR Laboratory not found
 *
 */

/**
 * @swagger
 * /disassociate-a-laboratory-from-an-exam:
 *  put:
 *    summary: Return the exam with less one association
 *    tags: [Exam]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DisassociateAExamWithANewLaboratory'
 * 
 *    responses:  
 *      200:
 *        description: Exam with a new laboratory associated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exam'
 *     
 *      403:  
 *        description: The exam needs at least one active laboratory OR Exam is inactive OR Laboratory is inactive
 *     
 *      404:
 *        description: Exam not found OR Laboratory not found
 * 
 */

/**
 * @swagger
 * /update-exams:
 *  put:
 *   summary: Return the list of updated exams
 *   tags: [Exam] 
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/ExamsToUpdate'
 *     
 *   responses: 
 *      200: 
 *        description: The list of updates exams
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exams'
 *      403:
 *        description: There's no valid exam
 */