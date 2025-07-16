import { Request, Response } from "express";
import User from "../../database/models/User";



const getUser = async (req: Request, res: Response) => {
    //  @ts-expect-error
     const user_id = req.parsedToken.id;
     console.log(user_id)
     
     const user = await User.findOne({
        where: {
            id: user_id
        }
     })
     console.log(user)

     res.status(200).json( {
        success: true,
        message: 'user found',
        data: user
     })
    
}

export {
     getUser
}