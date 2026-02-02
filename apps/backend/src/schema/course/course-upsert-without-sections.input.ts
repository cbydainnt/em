import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutSectionsInput } from './course-update-without-sections.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutSectionsInput } from './course-create-without-sections.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutSectionsInput {

    @Field(() => CourseUpdateWithoutSectionsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutSectionsInput)
    update!: CourseUpdateWithoutSectionsInput;

    @Field(() => CourseCreateWithoutSectionsInput, {nullable:false})
    @Type(() => CourseCreateWithoutSectionsInput)
    create!: CourseCreateWithoutSectionsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}
