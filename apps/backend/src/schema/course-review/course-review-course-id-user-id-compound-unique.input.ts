import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CourseReviewCourse_idUser_idCompoundUniqueInput {

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;
}
