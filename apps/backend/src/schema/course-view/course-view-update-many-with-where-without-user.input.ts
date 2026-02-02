import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewScalarWhereInput } from './course-view-scalar-where.input';
import { Type } from 'class-transformer';
import { CourseViewUpdateManyMutationInput } from './course-view-update-many-mutation.input';

@InputType()
export class CourseViewUpdateManyWithWhereWithoutUserInput {

    @Field(() => CourseViewScalarWhereInput, {nullable:false})
    @Type(() => CourseViewScalarWhereInput)
    where!: CourseViewScalarWhereInput;

    @Field(() => CourseViewUpdateManyMutationInput, {nullable:false})
    @Type(() => CourseViewUpdateManyMutationInput)
    data!: CourseViewUpdateManyMutationInput;
}
