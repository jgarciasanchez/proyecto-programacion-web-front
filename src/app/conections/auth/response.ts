import { Field, Int, ObjectType } from "type-graphql";
import { BaseResponse } from "src/app/conections/utils/utils"

@ObjectType()
export class LoginResponseData {
    @Field()
    accessToken?: string;
}

@ObjectType()
export class LoginUserOutput extends BaseResponse {
  constructor(data: any) {
    super();
    this.message = data.message;
    this.success = data.success;
    this.description = data.description;
    this.data = data.data;
    this.token = data.token;
  }

  @Field({ nullable: true })
  data?: LoginResponseData;

  @Field({ nullable: true })
  token?: String;
}