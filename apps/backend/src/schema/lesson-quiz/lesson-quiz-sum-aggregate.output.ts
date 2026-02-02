import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LessonQuizSumAggregate {

    @Field(() => Int, {nullable:true})
    order?: number;
}
