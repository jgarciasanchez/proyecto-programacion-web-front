import { ObjectType, Field, ID, Authorized, registerEnumType } from "type-graphql";
import { Service } from '../services/response'
import { Review } from '../reviews/response'
import { BaseResponse } from "../utils/utils";

export enum RolesTypes {
    NONE = "NONE",
    ADMIN = "ADMIN"
}

export enum UserStatusTypes {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
    UNVERIFIED = "UNVERIFIED"
}

registerEnumType(RolesTypes, {
    name: "RolesTypes",
    description: "Roles types of the application",
    valuesConfig: {
        ADMIN: {
            description: "Admin user role",
        },
        NONE: { description: "NONE" },
    },
});

registerEnumType(UserStatusTypes, {
    name: "UserStatusTypes",
    description: "Roles types of the application",
    valuesConfig: {
        ACTIVE: { description: "ACTIVE" },
        INACTIVE: { description: "INACTIVE" },
        BLOCKED: { description: "BLOCKED" },
        UNVERIFIED: { description: "UNVERIFIED" },
    },
});

@ObjectType()
export class GetCurrentUserOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: User;
}

@ObjectType()
export class GetAllUsersReportOutput  extends BaseResponse {

  @Field({ nullable: true })
  data?: [User];

}

@ObjectType()
export class User {
  
    id: number;

    name: string;

    lastName: string;

    email: string;

    password: string;

    code?: string;

    expirationDate?: number;

    role!: RolesTypes;

    reviews?: Review[];

    serviceId?: number;

    service?: Service;

    friends?: User[];

    createdAt?: string;

    updateAt?: string;

    status!: UserStatusTypes;
}