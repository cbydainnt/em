import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressUpdateManyMutationInput } from './user-lesson-progress-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UserLessonProgressWhereInput } from './user-lesson-progress-where.input';

@ArgsType()
export class UpdateManyUserLessonProgressArgs {

    @Field(() => UserLessonProgressUpdateManyMutationInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateManyMutationInput)
    data!: UserLessonProgressUpdateManyMutationInput;

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    @Type(() => UserLessonProgressWhereInput)
    where?: UserLessonProgressWhereInput;
}
