import { Field, Int, ObjectType } from "type-graphql";

export class RegisterUserInput {

    name: string;

    lastName: string;

    email: string;

    password: string;

}

export class ValidateRegisterUserInput {

    email: string;

    code: string;
}

export class AddUserFriendInput {

    idFriend: number;

}