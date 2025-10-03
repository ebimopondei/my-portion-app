import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { CreateProductDTO, createProductSchema } from '@shared/validation/product-schema';
import { AddressAndCartSchema, addressAndCartSchema } from '@shared/validation/check-out-schema';
import { Public } from 'src/auth/decorators/public.decorators';


@Controller('/v1/product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get()
    @Public()
    getProductByFilter(
        @Query('state') state: string, 
        @Query('limit') limit: number = 10, 
        @Query('page') page: number = 1
    ) {
        return this.productService.getProducts( state, limit, page);
    }


    @Get("me")
    getUserProductByFilter(
        @ParsedToken() user: User, 
        @Query('limit') limit: number = 10, 
        @Query('page') page: number = 1) 
    {
        return this.productService.getUserProducts(user, limit, page);
    
    }

    @Get(":id")
    @Public()
    getProductById(@Param("id") id) {
        
        return this.productService.getProductById(id);
        
    }
    
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_url', maxCount: 1 }, 
        { name: 'video_url', maxCount: 1 }
    ]))
    addNewProduct(
        @ParsedToken() user: User,
        @Body( new ZodValidationPipe(createProductSchema) ) productDto: CreateProductDTO, 
        @UploadedFiles() files: { imaage_url?: Express.Multer.File[], video_url?: Express.Multer.File[] }) {
        return this.productService.addNewProduct(user, productDto, files);
    }

    @Post("check-out")
    checkOut(
        @ParsedToken() user: User, 
        @Body(new ZodValidationPipe(addressAndCartSchema)) checkoutDTO: AddressAndCartSchema) {
        return this.productService.checkOut( user.id, checkoutDTO);    
    }

    @Put(":id")
    updateProductById() {
    
    }

    @Delete(":id")
    deleteProductById() {
    
    }
}
