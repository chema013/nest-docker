import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthUserSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'users', //Collection
      schema: AuthUserSchema,
    }], 'auth'), //Database
    PassportModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
