import express from 'express';
import { Product as controller} from '../../controller/index';
import { authorizeRoles, verifyJwt } from '../../middleware';
import { Roles } from '../../utils/enums'

const router = express.Router();

router.get(
    '/', 
    // authorizeRoles( Roles.USER, Roles.ADMIN, Roles.VENDOR,Roles.SUBADMIN), 
    controller.getProductByFilter 
);

router.get(
    '/:id', 
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.VENDOR,Roles.SUBADMIN), 
    controller.getProductById 
);

router.post(
    '/',
    verifyJwt,
    authorizeRoles( Roles.VENDOR, Roles.ADMIN, Roles.SUBADMIN), 
    controller.addNewProduct 
);

router.put(
    '/:id', 
    verifyJwt,
    authorizeRoles( Roles.VENDOR, Roles.ADMIN, Roles.SUBADMIN), 
    controller.updateProductById 
);

export const product = router;