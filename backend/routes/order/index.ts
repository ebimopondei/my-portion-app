import express from 'express';
import { Order as controller} from '../../controller/index';

const router = express.Router();

router.get('/:id', controller.getOrderById );

router.get('/all', controller.getAllOrders );

router.get('/', controller.getAllUserOrders );

router.post('/order', controller.addNewOrder );

export const order = router;