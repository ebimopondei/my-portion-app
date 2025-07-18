import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config/secret';
import { JwtPayload } from "../types/misc";
import multer from "multer";
import path from "path";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];  

    if( token == undefined || token == null || token == '' ) {
        res.status(401).json({ isAuthenticated: false});
        return;
    }
    
    try {
        const decoded = verify(token, SECRET ? SECRET : '') as JwtPayload;
        //@ts-ignore
        req.parsedToken  = decoded;
        //@ts-ignore
        req.roles = decoded.roles;
        next();
    } catch (err: any) {
        res.status(403).json({ success: true, message: err.message, data: [] });
        return;
    }
}

export const authorizeRoles = (...allowedRoles: string[]) =>{
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-expect-error
        const user = req.parsedToken;

        if(!user || !allowedRoles.includes(user.role)){
            
            return res.status(403).json({ success: false, message: 'Forbidden: insufficient rights'})
        }

        next();
    }
}


export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './build/backend/uploads/');
  },
  
  filename: (req, file, cb) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const newFileName = file.originalname + uniqueSuffix + fileExtension;
    cb(null, newFileName);
  },
});

export const upload = multer({storage});