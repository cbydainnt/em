import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CourseViewUpdateManyMutationInput } from './course-view-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CourseViewWhereInput } from './course-view-where.input';

@ArgsType()
export class UpdateManyCourseViewArgs {

    @Field(() => CourseViewUpdateManyMutationInput, {nullable:false})
    @Type(() => CourseViewUpdateManyMutationInput)
    data!: CourseViewUpdateManyMutationInput;

    @Field(() => CourseViewWhereInput, {nullable:true})
    @Type(() => CourseViewWhereInput)
    where?: CourseViewWhereInput;
}
