import { Router } from 'express'
import PublicController from '../controller/PublicController'
const router: Router = Router()
const controller = new PublicController()

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/getMe', controller.getMe);

export default router;