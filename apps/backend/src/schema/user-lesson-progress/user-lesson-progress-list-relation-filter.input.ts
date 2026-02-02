import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressWhereInput } from './user-lesson-progress-where.input';

@InputType()
export class UserLessonProgressListRelationFilter {

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    every?: UserLessonProgressWhereInput;

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    some?: UserLessonProgressWhereInput;

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    none?: UserLessonProgressWhereInput;
}
