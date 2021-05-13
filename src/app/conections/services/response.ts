import { Field, Int, ObjectType } from "type-graphql";
import { Review } from '../reviews/response'
import { Image } from '../image/response'

@ObjectType()
export class Service{

    id:number;
   
    title:string;
    
    description:string;

    reviews: Review[];

    images: Image[];

    createdAt:string;

    updatedAt:string;
}