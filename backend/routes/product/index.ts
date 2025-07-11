import express from 'express';
import { Product as controller} from '../../controller/index';

const router = express.Router();

router.get('/product', controller.getProductByLocation );

router.get('/product/:id', controller.getProductById );

router.post('/product', controller.addNewProduct );

router.put('/product/:id', controller.updateProductById );

export const product = router;