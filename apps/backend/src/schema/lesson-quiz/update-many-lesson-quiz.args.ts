import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizUpdateManyMutationInput } from './lesson-quiz-update-many-mutation.input';
import { Type } from 'class-transformer';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';

@ArgsType()
export class UpdateManyLessonQuizArgs {

    @Field(() => LessonQuizUpdateManyMutationInput, {nullable:false})
    @Type(() => LessonQuizUpdateManyMutationInput)
    data!: LessonQuizUpdateManyMutationInput;

    @Field(() => LessonQuizWhereInput, {nullable:true})
    @Type(() => LessonQuizWhereInput)
    where?: LessonQuizWhereInput;
}
