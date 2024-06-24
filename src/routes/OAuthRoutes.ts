import { Router } from 'express'
import OAuthController from '../controller/OAuthController'

const router: Router = Router()
const oAuthController = new OAuthController()

router.get('/github', oAuthController.github);
router.get('/facebook', oAuthController.facebook);

export default router;