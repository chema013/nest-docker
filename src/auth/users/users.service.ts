import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthUser, IUser } from './users.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    private users: IUser[] = [];

    constructor(@InjectModel('users') private readonly usersModel: Model<IAuthUser>) { }

    async usersTrash(): Promise<void> {
        this.users = [];
    }

    private async pushUsersFromDB(): Promise<void> {
        const authUsers = await this.usersModel.find();
        for (const user of authUsers) {
            const { username, password } = user;
            const userobj: IUser = { username, password };
            this.users.push(userobj);
        }
    }

    async findOne(username: string, password: string): Promise<IUser> {
        let userObj: IUser;

        this.pushUsersFromDB();

        for (const hash of this.users) {
            const userExists = await bcrypt.compare(username, hash.username)
                .then((res: boolean | undefined) => res);
            const passwordExist = await bcrypt.compare(password, hash.password)
                .then((res: boolean | undefined) => res);

            if (userExists && passwordExist) {
                userObj = { username: hash.username, password: hash.password };
                console.log(this.users);
                return userObj;
            }
        }
    }

}