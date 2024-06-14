import { Router } from 'express'
import PublicController from '../controller/PublicController'
import MiddleWare from '../middleware/middleware'
const router: Router = Router()
const publicController = new PublicController()
const middleWare = new MiddleWare();


router.post('/register', middleWare.middleFunction, publicController.register);
router.post('/login',    middleWare.middleFunction, publicController.login   );
router.get('/getMe',     middleWare.middleFunction, publicController.getMe   );

export default router;
