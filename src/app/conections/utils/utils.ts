import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class BaseResponse {

  success: Boolean;

  message: String;

  description: String;

  code: Number;
}