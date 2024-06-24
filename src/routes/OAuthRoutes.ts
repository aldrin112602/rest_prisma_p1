import { Router } from 'express'
import OAuthController from '../controller/OAuthController'

const router: Router = Router()
const oAuthController = new OAuthController()

router.post('/github', oAuthController.github);
router.post('/facebook', oAuthController.facebook);

export default router;