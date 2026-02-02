import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseCreateInput } from './combo-course-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneComboCourseArgs {

    @Field(() => ComboCourseCreateInput, {nullable:false})
    @Type(() => ComboCourseCreateInput)
    data!: ComboCourseCreateInput;
}
