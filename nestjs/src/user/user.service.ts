import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/User';

@Injectable()
export class UserService {

    async getUser(user_id:string) {
     
        const user = await User.findOne( {
            where: {
                id: user_id
            }   
        })

        return {
            success: true,
            message: 'user found',
            data: user
        }
    }
        
}
