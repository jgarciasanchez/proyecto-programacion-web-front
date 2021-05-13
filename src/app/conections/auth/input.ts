import { Field, Int, ObjectType } from "type-graphql";

export class RegisterUserInput {

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

}

export class ValidateRegisterUserInput {

    @Field()
    email: string;

    @Field()
    code: string;
}

export class AddUserFriendInput {

    @Field()
    idFriend: number;

}