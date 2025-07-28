import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register(
          { storage: diskStorage({
            destination: (req, file, cb) => {
              cb(null, './dist/nestjs/uploads');
            },
            
            filename: (req, file, cb) => {
          
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
              const fileExtension = path.extname(file.originalname);
              const newFileName = file.originalname + uniqueSuffix + fileExtension;
              cb(null, newFileName);
            },
          }) }
        ),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
