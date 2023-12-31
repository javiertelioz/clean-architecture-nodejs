import { Router } from 'express';

import IRoute from './route';
import IndexController from '../controllers/index-controller';

class IndexRouter implements IRoute {
  public path = '/';
  public router: Router = Router();

  private readonly controller: IndexController;

  constructor() {
    this.controller = new IndexController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.controller.welcome);
  }
}

export default IndexRouter;
