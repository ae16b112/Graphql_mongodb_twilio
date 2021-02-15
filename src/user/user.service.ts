import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuid} from 'uuid';
import { UserInput } from './user.input';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        ///@InjectTwilio() private readonly client: TwilioClient
    ) {}

    async getUser(id:string): Promise<User>{
        return this.userRepository.findOne({id})

    }

    async getUsers(): Promise<User[]>{
        return this.userRepository.find()
    }

    async createUser(userinput: UserInput): Promise<User>{

        const{name, LastName, Email, phoneNumber} = userinput

        const user = this.userRepository.create({
            id: uuid(),
            name,
            LastName,
            Email,
            phoneNumber,
        })
        //this.sendSMS(userinput.phoneNumber)
        return this.userRepository.save(user)
    }

    async removeUser(id: string): Promise<User> {
        const deleted_user = await this.userRepository.findOne({id})
        await this.userRepository.delete({id});
        return deleted_user
      }

    async updateUser(id:string, userinput: UserInput): Promise<User>{

        const{name, LastName, Email, phoneNumber} = userinput
        await this.userRepository.delete({id});

        const user = this.userRepository.create({
            id: id,
            name,
            LastName,
            Email,
            phoneNumber
        })

        //await this.sendSMS(userinput.phoneNumber)
        return this.userRepository.save(user)
    }    
    
}
    /*
    async sendSMS(phoneNumber: string) {
        if ( !this.validE164(phoneNumber) ) {
            throw new Error('number must be E164 format!')
        }
           
        else {
            const textContent = {
                body: "Hi from Niharika!!",
                to: phoneNumber,
                from: "+15672296147"
            }
            const message = await this.client.messages.create(textContent) 
            console.log(message, `message sent successfully to ${phoneNumber}`)
        }     
        
    }
    
    validE164(num: string) {
        return /^\+?[1-9]\d{1,14}$/.test(num)
    }

    */

