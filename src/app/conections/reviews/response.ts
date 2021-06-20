import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { User } from '../user/response'
import { Service } from '../services/response'

export enum StateReviews {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

registerEnumType(StateReviews, {
    name: "StateReviews",
    description: "Reviews state",
    valuesConfig: {
        ACTIVE: {
            description: "Basic user role",
        },
        INACTIVE: {
            description: "Moderator user role",
        }
    },
});


@ObjectType()
export class Review {
    id: number;
    description: string;
    rating: number;
    creatorUser: User;
    service: Service;
    state: StateReviews;
    responses: ResponseComment[];
    createdAt: string;
    updatedAt: string;

}

@ObjectType()
export class ResponseComment {
    id: number;
    description: String;
    creatorUser: User;
    creatorReview: Review;
    creatorUserId: number;
    creatorReviewId: number;
    createdAt: String;
    updatedAt: String;
}


