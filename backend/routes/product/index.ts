import express from 'express';
import { Product as controller} from '../../controller/index';

const router = express.Router();

router.get('/', controller.getProductByLocation );

router.get('/:id', controller.getProductById );

router.post('/', controller.addNewProduct );

router.put('/:id', controller.updateProductById );

export const product = router;