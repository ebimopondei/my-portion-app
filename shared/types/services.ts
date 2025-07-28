import { UserAttributes } from "./user"

export interface baseServiceResponse{

  success: boolean,
  data: {},
  message: string
    
}

export interface loginResponse extends baseServiceResponse {
  data: {
    token: string,
    refreshToken: string,
    user: UserAttributes
  }
}

export interface refreshTokenResponse extends baseServiceResponse {
  data: {
    token: string,
    refreshToken: string
  }
} 

export interface registerResponse extends baseServiceResponse {
  data: UserAttributes
}