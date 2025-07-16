import express from 'express';
import { User as controller} from '../../controller/index';
import { authorizeRoles, verifyJwt, upload } from '../../middleware';
import { Roles } from '@shared/enums/index'

const router = express.Router();



router.get(
    '/', 
    verifyJwt,
    authorizeRoles( Roles.USER, Roles.ADMIN, Roles.VENDOR,Roles.SUBADMIN), 
    controller.getUser 
);


export const user = router;