import { Injectable } from '@nestjs/common';
import { UserAttributes } from '@shared/types/user';
import { CreateProductDTO } from '@shared/validation/product-schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Product } from 'src/database/models/Product';
import fs  from 'fs'
import { Sequelize } from 'sequelize-typescript';
import { OrderRecord } from 'src/database/models/order-record';
import { Order } from 'src/database/models/Order';
import { User } from 'src/database/models/User';


@Injectable()
export class ProductService {

    constructor ( private readonly cloudinary: CloudinaryService, private readonly sequelize: Sequelize ) {}

    async getProductByFilter( state: string, limit: number, page: number) {
        const whereClause: Partial<Product> = {};

        if (state) {
            whereClause.location = state.toString().toLocaleLowerCase();
        }

        const productCount = await Product.count({ paranoid: true });
        const start = (Number(page) - 1) * Number(limit);

        const product = await Product.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            offset: Number(start),
            limit: Number(limit)
        });

        const totalPages = Math.ceil(productCount / Number(limit));

        return {
            success: true,
            data: { totalPages, productCount, product },
            message: "Products found!"
        };
    }

    async getProduct ( user: UserAttributes, state: string, limit: number, page: number) {
        
        const whereClause: Partial<Product> = {};
        if (state) {
            whereClause.location = state.toString().toLocaleLowerCase();
        }

        const productCount = await Product.count({ paranoid: true });
        const start = (Number(page) - 1) * Number(limit);

        const product = await Product.findAll({
            where: {
                ...whereClause, 
                seller_id: user.id
            },
            order: [["createdAt", "DESC"]],
            offset: Number(start), 
            limit: Number(limit)
        });

        const totalPages = Math.ceil(productCount / Number(limit)); 

        return {
            success: true,
            data: { totalPages, productCount, product },
            message: "Products found!"
        };
    }
    // Example method
    async getAllProducts( state: string, limit: number, page: number) {
        const whereClause: Partial<Product> = {};


        if (state) {
            whereClause.location = state.toString().toLocaleLowerCase();
        }

        const productCount = await Product.count({ paranoid: true });
        const start = (Number(page) - 1) * Number(limit);

        const product = await Product.findAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            offset: Number(start),
            limit: Number(limit)
        });

        const totalPages = Math.ceil(productCount / Number(limit));

        return {
            success: true,
            data: { totalPages, productCount, product },
            message: "Products found!"
        };
    }
    
    async getProductById(id: string) {
        const product = await Product.findOne({ where: { id }, include: [User] });

        return {
            success: true,
            data: product,
            message: `Product id: ${product?.id}`
        };
        
    }
    
    async addNewProduct(user: UserAttributes, productDto: CreateProductDTO,  files: { image_url?: Express.Multer.File[], video_url?: Express.Multer.File[] }) {
        
        const { cloudinary, cloudinaryUploadFolder } = this.cloudinary.getCloudinary()

        console.log("Files received:", files);
        const image_url_path = files.image_url ? files.image_url[0].path : null;

        const video_url_path = files.video_url ? files.video_url[0].path : null;

        if( !image_url_path || !video_url_path ) {
            throw new Error("Image and Video files are required");
        }
        

        let result = await cloudinary.uploader.upload(image_url_path, { folder: cloudinaryUploadFolder })
        const image_url = result.secure_url
        const video_result = await cloudinary.uploader.upload(video_url_path, { resource_type: "video", folder: cloudinaryUploadFolder })
        const video_url = video_result.secure_url



        const product = await Product.create( {
          seller_id: String(user.id),
          name: productDto.name,
          status: 'pending',
          number_per_portion: productDto.number_per_portion,
     
          description: productDto.description || '',
          image_url,
          video_url,
          category: productDto.category,
          total_quantity: Number(productDto.total_quantity),
          quantity_unit: productDto.quantity_unit,
          portion_size: Number(productDto.portion_size),
          price_per_portion: Number(productDto.price_per_portion),
          available_portions: Number(productDto.total_quantity)/Number(productDto.portion_size),
          location: productDto.location || ''
     })

     if (fs.existsSync(image_url_path)) {
          fs.unlinkSync(image_url_path);
     }
     if (fs.existsSync(video_url_path)) {
          fs.unlinkSync(video_url_path);
     }

     return {
        success: true,
        data: product,
        message: `Product id: ${product.id} created successfully!`
     }
        

    }

    async checkOut(user_id: string, checkoutDTO: any) {


        const orders: Order[] = [];

        // check if portion is available

        for (const item of checkoutDTO.cartItems ) {
            const product = await Product.findOne( {
                where: {
                        id: item.id
                }
            })

            if(Number(product?.available_portions) < item.quantity){
                return {
                    success: false,
                    message: `Insufficient portions. Available portions for ${product?.name} is ${product?.available_portions}. Please reduce portion amount from cart.`
                }
            }
        }

        let orderRecord = {}


        await this.sequelize.transaction( async ( t) => {

            const { dataValues} = await OrderRecord.create( {
                product_id: checkoutDTO.cartItems.map( item => item.id),
                status: "pending",
                order_ids: [],
                user_id,
            }, { transaction: t })

            for ( const item of checkoutDTO.cartItems ) {
                const order = await Order.create( {
                        amount: String(item.price),
                        portion: item.quantity,
                        order_record_id: String(dataValues.id),
                        product_id: item.id,
                        status: 'pending',
                        user_id,
                }, { transaction: t })

                await OrderRecord.update( {
                        order_ids: order.id,
                },
                { 
                        where: {
                            id: dataValues.id
                        },
                        transaction: t
                })

                orders.push(order)
            }

            orderRecord = dataValues

        })

        const orderDetails = {...orderRecord, orders}

        return {
            success: true,
            data: orderDetails,
            message: "Order created successfully"
        }


    }
}
