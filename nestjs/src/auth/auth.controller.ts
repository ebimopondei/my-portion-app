import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto, loginUserSchema } from '@shared/validation/loginUserDTO';
import { createUserDto, createUserSchema } from '@shared/validation/createUserDTO';
import { loginResponse, registerResponse } from '@shared/types';
import { refreshTokenResponse } from '@shared/types/services';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { Public } from './decorators/public.decorators';

@Controller('/v1/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @UsePipes(new ZodValidationPipe(loginUserSchema))
    login(@Body() loginDto: loginUserDto): Promise<loginResponse> {
        console.log('hide')
        return this.authService.login(loginDto);
    }

    @Post('signup')
    @Public()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    register(@Body() createUserDto: createUserDto): Promise<registerResponse> {
        return this.authService.register(createUserDto);
    }
    
    @Post('refresh')
    @Public()
    refreshToken(@Body() body: { refreshToken: string }): Promise<refreshTokenResponse> {
        return this.authService.refreshToken(body.refreshToken);
    }   
}
