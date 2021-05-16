import { Field, Int, ObjectType } from "type-graphql";
import { User } from '../user/response';
import { BaseResponse } from '../utils/utils';

export class RegisterUserOutput extends BaseResponse{

  data?: User;

}

