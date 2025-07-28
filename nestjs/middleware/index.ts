
import { Injectable, NestMiddleware } from '@nestjs/common';
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

  private readonly jwtSecret = 'jwt_secret'; // Use env var in production

  use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers['authorization']?.split(' ')[1];  

    if( token == undefined || token == null || token == '' ) {
        res.status(401).json({ isAuthenticated: false});
        return;
    }
    
    try {
        const decoded = verify(token, this.jwtSecret ) as JwtPayload;
        //@ts-ignore
        req.parsedToken  = decoded;
        //@ts-ignore
        req.roles = decoded.roles;
        // next();
        // return;
    } catch (err: any) {
        res.status(403).json({ success: true, message: err.message, data: [] });
        return;
    }

    next();
  }
}
