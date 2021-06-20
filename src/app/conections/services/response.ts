import { Field, Int, ObjectType } from "type-graphql";
import { Review } from '../reviews/response'
import { Image } from '../image/response'
import { BaseResponse } from "../utils/utils";
@ObjectType()
export class UsersAndServicesData {

  id: number;
  name: string;
  lastName: string;
  serviceId: number;
  description: string;
  title: string;
}

@ObjectType()
export class GetUsersAndServiserOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [UsersAndServicesData];

}

@ObjectType()
export class GetReportedServicesOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [Service];

}

@ObjectType()
export class GetAllServicesOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [Service];

}

@ObjectType()
export class GetResponseCommentOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [ResponseComment];

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

  reportCount?: number;
}

@ObjectType()
export class ResponseComment {

  id: number;

  description: string;

  createdAt: string;

  updatedAt: string;
}


