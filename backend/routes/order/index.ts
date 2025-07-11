import express from 'express';
import { Order as controller} from '../../controller/index';

const router = express.Router();

router.get('/order/:id', controller.getOrderById );

router.post('/order', controller.addNewOrder );

export const order = router;