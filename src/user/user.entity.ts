import { ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity()
export class User{

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    LastName: string

    @Column()
    Email: string

    @Column()
    phoneNumber: string

}

