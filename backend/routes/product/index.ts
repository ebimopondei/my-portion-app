import express from 'express';
import { Product as controller} from '../../controller/index';
import { authorizeRoles } from '../../middleware';
import { Roles } from '../../utils/enums'

const router = express.Router();

router.get(
    '/', 
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.VENDOR,Roles.SUBADMIN), 
    controller.getProductByFilter 
);

router.get(
    '/:id', 
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.VENDOR,Roles.SUBADMIN), 
    controller.getProductById 
);

router.post(
    '/', 
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.SUBADMIN), 
    controller.addNewProduct 
);

router.put(
    '/:id', 
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.SUBADMIN), 
    controller.updateProductById 
);

export const product = router;