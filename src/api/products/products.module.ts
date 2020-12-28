import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ProductsController } from './products.controller';
import { ProductSchema } from './products.model';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Products', //Collection
      schema: ProductSchema,
    }], 'products'), //Database
    PassportModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
