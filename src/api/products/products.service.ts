import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from './products.dto';
import { IProduct } from './products.interface';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Products') private readonly productsModel: Model<IProduct>) { }

    public async getProducts(): Promise<IProduct[]> {
        return await this.productsModel.find();
    }

    public async getProduct(productID: string): Promise<IProduct> {
        return await this.productsModel.findById(productID);
    }

    public async createProduct(DTO: ProductDTO): Promise<IProduct> {
        return await new this.productsModel(DTO).save();
    }

    public async updateProduct(productID: string, DTO: ProductDTO): Promise<IProduct> {
        return await this.productsModel.findByIdAndUpdate(productID, DTO, { new: true });
    }

    public async deleteProduct(productID: string): Promise<IProduct> {
        return await this.productsModel.findByIdAndDelete(productID);
    }
}
