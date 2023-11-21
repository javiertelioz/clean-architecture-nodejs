import { Router } from 'express';

import HelloController from '../../controllers/hello-controller';
import IRoute from '../route';

class HelloRouter implements IRoute {
  public path = '/hello';
  public router: Router = Router();

  private readonly controller: HelloController;

  constructor() {
    this.controller = new HelloController();

    this.initializeRoutes();
  }

  /**
   * @swagger
   * tags:
   *  name: Hello
   *  description: API to manage your hello.
   *
   * definitions:
   *   Hello:
   *     properties:
   *       message:
   *         type: string
   */
  private initializeRoutes() {
    /**
     * @swagger
     * /hello/{name}:
     *  get:
     *    summary: Say Hello
     *    tags:
     *      - Hello
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: path
     *        name: name
     *        required: true
     *        description: Your name.
     *        default: World
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: Say Hello
     *        examples:
     *          application/json:
     *            message: "Hello World"
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Hello"
     */
    this.router.get(`${this.path}/:name?`, this.controller.sayHello);
  }
}

export default HelloRouter;
