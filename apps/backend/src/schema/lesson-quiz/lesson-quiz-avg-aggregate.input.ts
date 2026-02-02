import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class LessonQuizAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    order?: true;
}
