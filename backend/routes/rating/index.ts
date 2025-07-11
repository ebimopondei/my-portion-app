import express from 'express';
import { Rating as controller} from '../../controller/index';

const router = express.Router();

router.post('/product', controller.giveRating );

export const rating = router;