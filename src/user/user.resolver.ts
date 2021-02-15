import { Resolver, Query, Mutation, Args} from '@nestjs/graphql'
import { User } from './user.entity';
import {UserInput } from './user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { smsService } from './sms.service'


@Resolver(of => UserType)
export class UserResolver{

    constructor(
        private userService: UserService,
        private smsservice: smsService
    ){}


    @Query(returns => UserType)
    user(
        @Args('id') id: string,
    ){
        return this.userService.getUser(id)
    }

    @Query(returns => [UserType])
    users(){

        return this.userService.getUsers()
    }

    @Mutation(returns => UserType)
    createUser(
        @Args('userinput') userinput: UserInput
    )
    {
        this.smsservice.sendSMS(userinput.phoneNumber)
        return this.userService.createUser(userinput);
    }


    @Mutation(returns => UserType)
    deleteUser(
        @Args('id') id: string,
    )
    {
        return this.userService.removeUser(id);
    }

    @Mutation(returns => UserType)
    update(
        @Args('userinput') userinput: UserInput,
        @Args('id') id: string,
    )
    {
        this.smsservice.sendSMS(userinput.phoneNumber)
        return this.userService.updateUser(id, userinput);
    }  

}

