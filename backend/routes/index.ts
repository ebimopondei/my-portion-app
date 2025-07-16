import express, { Request, Response } from 'express';
import { auth } from './auth';
import { product} from './product'
import { verifyJwt } from '../middleware';
// import { user } from './user'
import { order } from './order'
import { rating } from './rating'
import { vendor } from './vendor'

const router = express.Router();

router.get('/', (req: Request, res:Response) =>{
    res.status(200).json( { message: `server stared now!`});
})

router.use('/auth', auth)

router.use('/product', product)

// router.use('user', user)

router.use('/order', verifyJwt, order)

router.use('/rating', verifyJwt, rating)

router.use('/vendor/', verifyJwt, vendor)

export const APPROUTER = router