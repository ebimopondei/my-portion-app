import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/models/User';
import * as bcrypt from 'bcryptjs';
import { JwtPayload, verify, sign, } from 'jsonwebtoken';

import { loginUserDto } from '@shared/validation/loginUserDTO';
import { createUserDto } from '../../../shared/validation/createUserDTO';
import { loginResponse, registerResponse } from '../../../shared/types';
import { refreshTokenResponse } from '../../../shared/types/services';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private readonly jwtSecret = 'jwt_secret'; // Use env var in production
  private readonly jwtSecretRefresh = 'jwt_secret_refresh'; // Use env var in production

  async register(createUserDto: createUserDto): Promise<registerResponse> {
    
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({ 
      firstname: createUserDto.firstname, 
      lastname: createUserDto.lastname, 
      email: createUserDto.email, 
      // username: createUserDto.firstname,
      password: passwordHash,
      role: createUserDto.role,
      email_verified: false,
      kyc_verified: false,
    });
    return {
      success: true,
      data: user,
      message: 'User registered',
    };
  }


  

  async login(loginDto: loginUserDto): Promise<loginResponse> {
    const user = await this.userModel.findOne({ where: { email: loginDto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(loginDto.password, user.dataValues.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = sign(user.toJSON(), 'jwt_secret', { expiresIn: '1h' });
    const refreshToken = sign(user.toJSON(), "jwt_secret_refresh", { expiresIn: '1d' });
    return { success: true, data: { token, refreshToken, user }, message: "Login Successful" };
  }

  async refreshToken(token: string): Promise<refreshTokenResponse> {
    console.log('Refresh token:', token);
    if (!token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try { 

      const decoded = verify(token, this.jwtSecretRefresh) as JwtPayload;
      console.log('Decoded token:', decoded); 
      delete decoded?.iat; 
      delete decoded?.exp;
      const newToken = sign(decoded, this.jwtSecret, { expiresIn: '1h' });
      const newRefreshToken = sign(decoded, this.jwtSecretRefresh, { expiresIn: '1d' });
      return { success: true, data: { token: newToken, refreshToken: newRefreshToken }, message: 'Tokens refreshed successfully'  };
    } catch (error:any) {
      console.log(error)
      throw new UnauthorizedException(error.message || 'Invalid refresh token');
    }
  }
}
