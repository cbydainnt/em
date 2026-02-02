import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class LessonSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    lesson_type?: true;

    @Field(() => Boolean, {nullable:true})
    lesson_order?: true;

    @Field(() => Boolean, {nullable:true})
    minutes?: true;

    @Field(() => Boolean, {nullable:true})
    video_duration?: true;

    @Field(() => Boolean, {nullable:true})
    access_type?: true;
}
