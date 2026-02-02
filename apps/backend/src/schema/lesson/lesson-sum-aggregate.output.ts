import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LessonSumAggregate {

    @Field(() => Int, {nullable:true})
    lesson_type?: number;

    @Field(() => Int, {nullable:true})
    lesson_order?: number;

    @Field(() => Int, {nullable:true})
    minutes?: number;

    @Field(() => Int, {nullable:true})
    video_duration?: number;

    @Field(() => Int, {nullable:true})
    access_type?: number;
}
