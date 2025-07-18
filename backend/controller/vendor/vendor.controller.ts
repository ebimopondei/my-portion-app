import { Request, Response } from "express";
import KycBusiness from "../../database/models/KycBusiness";
import KycBusinessDocs from "../../database/models/KycBusinessDocs";
import KycIdVerification from "../../database/models/KycIdVerification";
import KycPersonal from "../../database/models/KycPersonal";
import { cloudinary, cloudinaryUploadFolder } from "../../config/cloudinary";
import fs  from 'fs'
import User from "../../database/models/User";
import z from "zod";
import { kycDetails } from "@shared/types/kyc";
import OrderRecord from "../../database/models/order-record";
import { user } from "routes/user";
import Order from "../../database/models/Order";
import Product from "../../database/models/Product";



const vendorKycSchemaBE = z.object( {
    firstname: z.string(),
    lastname: z.string(),
    date_of_birth: z.string(),
    phone_number: z.string(),
    email: z.string(),
    bvn: z.string().length(11, "must be 11 numbers"),
    address: z.string(),
    town: z.string(),
    city: z.string(),
    state: z.string(),


    business_name: z.string(),
    business_email:z.email(),
    business_phone_number:z.string(),
    cac_number:z.string(),
    tax_id:z.string(),
    business_address:z.string(),


    id_type:  z.string(),
    id_number: z.string(),
    id_front:  z.file().optional(),
    id_back:  z.file().optional(),
    passport:  z.file().optional(),
    

    utility_bill:   z.file().optional(),
    cac_certificate:  z.file().optional(),
    tax_certificate:  z.file().optional(),
})


const submitKyc = async (req: Request, res: Response) => {

     // @ts-expect-error
     const user = req.parsedToken

     let result;
     
     const validated = vendorKycSchemaBE.parse(req.body)
     // @ts-expect-error
     const id_front_url_path = req?.files['id_front'][0].path
     // @ts-expect-error
     const id_back_url_path = req?.files['id_back'][0].path
     // @ts-expect-error
     const passport_url_path = req?.files['passport'][0].path
     // @ts-expect-error
     const utility_bill_url_path = req?.files['utility_bill'][0].path
     // @ts-expect-error
     const cac_certificate_url_path = req?.files['cac_certificate'][0].path
     // @ts-expect-error
     const tax_certificate_url_path = req?.files['tax_certificate'][0].path
     

     if( !id_front_url_path || !id_back_url_path || !passport_url_path || !utility_bill_url_path || !cac_certificate_url_path || !tax_certificate_url_path) {
          res.status(400).json( { success: false, message: 'Missing file upload'})
          return 
     }

     result = await cloudinary.uploader.upload(id_front_url_path, { folder: cloudinaryUploadFolder })
     const id_front = cloudinary.url(result.secure_url)
     result = await cloudinary.uploader.upload(id_back_url_path, { folder: cloudinaryUploadFolder })
     const id_back = cloudinary.url(result.secure_url)
     result = await cloudinary.uploader.upload(passport_url_path, { folder: cloudinaryUploadFolder })
     const passport = cloudinary.url(result.secure_url)
     result = await cloudinary.uploader.upload(utility_bill_url_path, { folder: cloudinaryUploadFolder })
     const utility_bill = cloudinary.url(result.secure_url)
     result = await cloudinary.uploader.upload(cac_certificate_url_path, { folder: cloudinaryUploadFolder })
     const cac_certificate = cloudinary.url(result.secure_url)
     result = await cloudinary.uploader.upload(tax_certificate_url_path, { folder: cloudinaryUploadFolder })
     const tax_certificate = cloudinary.url(result.secure_url)


     const personal = await KycPersonal.create( {
          user_id: user.id,
          address: validated.address,
          bvn: validated.bvn,
          city: validated.city,
          // @ts-expect-error
          date_of_birth: validated.date_of_birth,
          email: validated.email,
          firstname: validated.firstname,
          lastname: validated.lastname,
          phone_number: validated.phone_number,
          state: validated.state,
          town: validated. town,
          
     })

     const business = await KycBusiness.create( {
          business_address: validated.business_address,
          business_email: validated.business_email,
          business_name: validated.business_name,
          business_phone_number: validated.business_phone_number,
          cac_number: validated.cac_number,
          tax_id: validated.tax_id,
          user_id: user.id
     })

     const id = await KycIdVerification.create( {
          id_back,
          id_front,
          id_number: validated.id_number,
          passport,
          id_type: validated.id_type,
          user_id: user.id
     })

     const businessDocs = await KycBusinessDocs.create( {
          cac_certificate,
          tax_certificate,
          user_id: user.id,
          utility_bill
     })

     const response = await User.update( {
          kyc_verified: true,
     },
     {
          where: {
               id: user.id
          }
     }
)

     if (fs.existsSync(id_front_url_path)) {
          fs.unlinkSync(id_front_url_path);
     }

     if (fs.existsSync(id_back_url_path)) {
          fs.unlinkSync(id_back_url_path);
     }

     if (fs.existsSync(tax_certificate_url_path)) {
          fs.unlinkSync(tax_certificate_url_path);
     }

     if (fs.existsSync(cac_certificate_url_path)) {
          fs.unlinkSync(cac_certificate_url_path);
     }

     if (fs.existsSync(utility_bill_url_path)) {
          fs.unlinkSync(utility_bill_url_path);
     }

     if (fs.existsSync(passport_url_path)) {
          fs.unlinkSync(passport_url_path);
     }

     res.status(201).json({
          success: true,
          data: [],
          message: `KYC under review!`
     })
}


const getKycDetails = async (req: Request, res: Response ) =>{
     
     // @ts-expect-error
     const user = req.parsedToken;

     const personal = await KycPersonal.findOne({
          where: {
               user_id: user.id
          }
     })

     const business = await KycBusiness.findOne( {
          where: {
               user_id: user.id
          }
     })

     const id = await KycIdVerification.findOne( {
          where: {
               user_id: user.id
          }
     })

     const docs = await KycBusinessDocs.findOne( {
          where: {
               user_id: user.id
          }
     })

     const kyc: Partial<kycDetails> = {}
     kyc.personal = personal
     kyc.business = business
     kyc.docs = docs
     kyc.id = id

     res.status(200).json( {
          success: true,
          data: kyc,
          message: 'KYC info found!'
     })
}


const getOrderRecord = async (req: Request, res: Response ) => {

     // @ts-expect-error
     const user = req.parsedToken;

     const products = await Product.findAll( {
          where: {
               seller_id: user.id
               
          },

          include: [ { model: Order, include: [User]} ]

     })

     res.status(200).json( {
          success: true,
          data: products,
          message: "Orders found"
     })
}




export {
     submitKyc,
     getKycDetails,
     getOrderRecord
}