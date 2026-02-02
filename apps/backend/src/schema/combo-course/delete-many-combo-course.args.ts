import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCourseWhereInput } from './combo-course-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyComboCourseArgs {

    @Field(() => ComboCourseWhereInput, {nullable:true})
    @Type(() => ComboCourseWhereInput)
    where?: ComboCourseWhereInput;
}
