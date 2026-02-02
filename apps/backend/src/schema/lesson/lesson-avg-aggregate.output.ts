import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class LessonAvgAggregate {

    @Field(() => Float, {nullable:true})
    lesson_type?: number;

    @Field(() => Float, {nullable:true})
    lesson_order?: number;

    @Field(() => Float, {nullable:true})
    minutes?: number;

    @Field(() => Float, {nullable:true})
    video_duration?: number;

    @Field(() => Float, {nullable:true})
    access_type?: number;
}
