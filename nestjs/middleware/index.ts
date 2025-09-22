
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';




@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
}

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {

  constructor( private readonly configService: ConfigService ){}

  use(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = this.configService.get('ACCESSTOKENSECRET');
    
    const token = req.headers['authorization']?.split(' ')[1];  

    if( token == undefined || token == null || token == '' ) {
        res.status(401).json({ isAuthenticated: false});
        return;
    }
    
    try {
        const decoded = verify(token, jwtSecret ) as JwtPayload;
        //@ts-ignore
        req.parsedToken  = decoded;
        //@ts-ignore
        req.roles = decoded.roles;
    } catch (err: any) {
        res.status(403).json({ success: true, message: err.message, data: [] });
        return;
    }

    next();
  }
}
