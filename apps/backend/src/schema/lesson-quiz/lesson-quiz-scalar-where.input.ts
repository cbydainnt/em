import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class LessonQuizScalarWhereInput {

    @Field(() => [LessonQuizScalarWhereInput], {nullable:true})
    AND?: Array<LessonQuizScalarWhereInput>;

    @Field(() => [LessonQuizScalarWhereInput], {nullable:true})
    OR?: Array<LessonQuizScalarWhereInput>;

    @Field(() => [LessonQuizScalarWhereInput], {nullable:true})
    NOT?: Array<LessonQuizScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    quiz_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    order?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;
}
