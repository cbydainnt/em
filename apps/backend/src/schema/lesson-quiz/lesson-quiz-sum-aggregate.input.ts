import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class LessonQuizSumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    order?: true;
}
