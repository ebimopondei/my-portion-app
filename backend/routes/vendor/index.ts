import express from 'express';
import { Vendor as controller} from '../../controller/index';
import { authorizeRoles, verifyJwt, upload } from '../../middleware';
import { Roles } from '@shared/enums/index'

const router = express.Router();

router.post(
    '/kyc',
    verifyJwt,
    authorizeRoles( Roles.VENDOR, Roles.ADMIN, Roles.SUBADMIN),
    upload.fields([
        { name: 'tax_certificate', maxCount: 1 },
        { name: 'cac_certificate', maxCount: 1 },
        { name: 'utility_bill', maxCount: 1 },
        { name: 'passport', maxCount: 1 },
        { name: 'id_back', maxCount: 1 },
        { name: 'id_front', maxCount: 1 },
    ]),
    controller.submitKyc 
);

router.get(
    '/kyc', 
    verifyJwt, 
    authorizeRoles( Roles.VENDOR, Roles.ADMIN, Roles.SUBADMIN),
    controller.getKycDetails
)

router.get(
    '/order-record', 
    verifyJwt, 
    authorizeRoles( Roles.VENDOR, Roles.ADMIN, Roles.SUBADMIN),
    controller.getOrderRecord
)


export const vendor = router;