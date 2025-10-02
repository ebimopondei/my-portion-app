import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParsedToken } from 'decorators';
import { User } from 'src/database/models/User';
import { ZodValidationPipe } from 'pipes/zod-validation-pipe';
import { CreateProductDTO, createProductSchema, productSchema } from '@shared/validation/product-schema';
import z from 'zod';
import { Public } from 'src/auth/decorators/public.decorators';


const CartItemSchema = z.object({
     id: z.string().uuid(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  unit: z.string(),
  vendor_id: z.string(),
  quantity: z.number(),
});


const AddressAndCartSchema = z.object({
     street_address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  delivery_note: z.string().optional(),
  cartItems: z.array(CartItemSchema),
});

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
        @Body(new ZodValidationPipe(AddressAndCartSchema)) checkoutDTO: any) {
        return this.productService.checkOut( user.id, checkoutDTO);    
    }

    @Put(":id")
    updateProductById() {
    
    }

    @Delete(":id")
    deleteProductById() {
    
    }
}
