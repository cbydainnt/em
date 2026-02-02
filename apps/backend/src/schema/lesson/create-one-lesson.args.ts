import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonCreateInput } from './lesson-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneLessonArgs {

    @Field(() => LessonCreateInput, {nullable:false})
    @Type(() => LessonCreateInput)
    data!: LessonCreateInput;
}
