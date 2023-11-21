import IndexRouter from './routes';

import AuthRouter from './routes/auth';
import HelloRouter from './routes/hello';
import UserRouter from './routes/user';

export const Router = () => [new IndexRouter(), new HelloRouter(), new UserRouter(), new AuthRouter()];
