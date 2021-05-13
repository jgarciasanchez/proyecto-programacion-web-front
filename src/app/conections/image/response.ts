import { Field, Int, ObjectType } from "type-graphql";
import { Service } from "../services/response";

@ObjectType()
export class Image {

    id: number;

    title: string;

    url: string;

    service: Service;

    createdAt: string;

    updatedAt: string;
}