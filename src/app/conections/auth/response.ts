import { Field, Int, ObjectType } from "type-graphql";
import { BaseResponse } from "src/app/conections/utils/utils"

@ObjectType()
export class LoginResponseData {
    @Field()
    accessToken?: string;
}

@ObjectType()
export class LoginUserOutput extends BaseResponse {

  @Field({ nullable: true })
  data?: LoginResponseData;

  @Field({ nullable: true })
  token?: String;
}