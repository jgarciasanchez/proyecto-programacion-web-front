import { Field, Int, ObjectType } from "type-graphql";
import { Review } from '../reviews/response'
import { Image } from '../image/response'
import { BaseResponse } from "../utils/utils";
@ObjectType()
export class UsersAndServicesData {

  id: number;

  title: string;

  description: string;

  name: string;

  lastName: string;

}

@ObjectType()
export class GetUsersAndServiserOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [UsersAndServicesData];

}
@ObjectType()
export class Service {

  id: number;

  title: string;

  description: string;

  reviews: Review[];

  images: Image[];

  createdAt: string;

  updatedAt: string;
}