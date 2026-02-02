import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCourseAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    total_paused_days?: true;

    @Field(() => Boolean, {nullable:true})
    pause_count?: true;
}
