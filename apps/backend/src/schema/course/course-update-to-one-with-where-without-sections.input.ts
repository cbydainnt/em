import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutSectionsInput } from './course-update-without-sections.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutSectionsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutSectionsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutSectionsInput)
    data!: CourseUpdateWithoutSectionsInput;
}
