import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class CloudinaryService {
    constructor( private readonly configService: ConfigService ) {}

    
    getCloudinary() {
        const cloudinaryUploadFolder = this.configService.get('NODE_ENV') === 'production' ? 'prod' : 'dev';
        cloudinary.config( { 
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET')
        })

        return { cloudinary, cloudinaryUploadFolder}
    }
}
