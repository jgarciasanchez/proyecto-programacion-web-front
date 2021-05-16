import { Field, Int, ObjectType } from "type-graphql";
import { Review } from '../reviews/response'
import { Image } from '../image/response'
import { BaseResponse } from "../utils/utils";
import { User } from "../user/response";


@ObjectType()
export class GetUserFriendsOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: [User];

}