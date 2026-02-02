import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserLessonProgressScalarWhereInput } from './user-lesson-progress-scalar-where.input';
import { Type } from 'class-transformer';
import { UserLessonProgressUpdateManyMutationInput } from './user-lesson-progress-update-many-mutation.input';

@InputType()
export class UserLessonProgressUpdateManyWithWhereWithoutUserInput {

    @Field(() => UserLessonProgressScalarWhereInput, {nullable:false})
    @Type(() => UserLessonProgressScalarWhereInput)
    where!: UserLessonProgressScalarWhereInput;

    @Field(() => UserLessonProgressUpdateManyMutationInput, {nullable:false})
    @Type(() => UserLessonProgressUpdateManyMutationInput)
    data!: UserLessonProgressUpdateManyMutationInput;
}
