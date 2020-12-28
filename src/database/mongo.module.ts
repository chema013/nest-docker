import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: 'auth', //Database name
            useFactory: (configService: ConfigService) => ({
                // uri: 'mongodb+srv://chema:Mechemix.1@cluster0.pcdwu.mongodb.net/auth?retryWrites=true&w=majority',
                uri: configService.get<string>('MONGO_AUTH_URI'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            connectionName: 'products',
            useFactory: (configService: ConfigService) => ({
                // uri: 'mongodb+srv://chema:Mechemix.1@cluster0.pcdwu.mongodb.net/products?retryWrites=true&w=majority',
                uri: configService.get<string>('MONGO_PRODUCTS_URI'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule { }
