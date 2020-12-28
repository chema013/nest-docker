import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDTO } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/almacen')
    private async createProduct(@Res() res: any, @Body() DTO: ProductDTO) {
        const product = await this.productService.createProduct(DTO);
        return res.status(HttpStatus.OK).json(product);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/almacen')
    private async getProducts(@Res() res: any) {
        const product = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(product);
    }

}
