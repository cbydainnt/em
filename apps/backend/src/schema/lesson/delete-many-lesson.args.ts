import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyLessonArgs {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}
