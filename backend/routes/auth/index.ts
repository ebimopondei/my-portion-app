import express from 'express';
import { Auth as controller} from '../../controller/index';

const router = express.Router();

router.post('/login', controller.loginController );

router.post('/signup', controller.signupController);

router.post('/refresh', controller.refreshTokenController);

export const auth = router;