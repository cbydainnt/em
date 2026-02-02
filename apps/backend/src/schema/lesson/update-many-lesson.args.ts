import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonUpdateManyMutationInput } from './lesson-update-many-mutation.input';
import { Type } from 'class-transformer';
import { LessonWhereInput } from './lesson-where.input';

@ArgsType()
export class UpdateManyLessonArgs {

    @Field(() => LessonUpdateManyMutationInput, {nullable:false})
    @Type(() => LessonUpdateManyMutationInput)
    data!: LessonUpdateManyMutationInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
