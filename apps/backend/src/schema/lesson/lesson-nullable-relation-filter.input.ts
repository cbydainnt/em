import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonNullableRelationFilter {

    @Field(() => LessonWhereInput, {nullable:true})
    is?: LessonWhereInput;

    @Field(() => LessonWhereInput, {nullable:true})
    isNot?: LessonWhereInput;
}
