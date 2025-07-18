import express from 'express';
import { Order as controller} from '../../controller/index';

const router = express.Router();

router.get('/:id', controller.getOrderById );

router.get('/all', controller.getAllOrders );

router.get('/', controller.getAllUserOrders );

router.post('/', controller.addNewOrder );

router.patch('/complete-check-out/:id', controller.markAsPaid );

export const order = router;