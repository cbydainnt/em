import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLessonProgressWhereInput } from './user-lesson-progress-where.input';
import { Type } from 'class-transformer';
import { UserLessonProgressOrderByWithRelationInput } from './user-lesson-progress-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserLessonProgressWhereUniqueInput } from './user-lesson-progress-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserLessonProgressScalarFieldEnum } from './user-lesson-progress-scalar-field.enum';

@ArgsType()
export class FindFirstUserLessonProgressOrThrowArgs {

    @Field(() => UserLessonProgressWhereInput, {nullable:true})
    @Type(() => UserLessonProgressWhereInput)
    where?: UserLessonProgressWhereInput;

    @Field(() => [UserLessonProgressOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserLessonProgressOrderByWithRelationInput>;

    @Field(() => UserLessonProgressWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserLessonProgressWhereUniqueInput, 'id' | 'user_id_lesson_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UserLessonProgressScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UserLessonProgressScalarFieldEnum>;
}
