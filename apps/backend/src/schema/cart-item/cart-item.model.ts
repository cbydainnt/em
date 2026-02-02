import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Course } from '../course/course.model';

@ObjectType()
export class CartItem {

    @Field(() => ID, {nullable:false})
    cart_item_id!: string;

    @Field(() => String, {nullable:false})
    user_id!: string;

    @Field(() => String, {nullable:false})
    course_id!: string;

    @Field(() => Date, {nullable:false})
    added_at!: Date;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    selected!: boolean;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Course, {nullable:false})
    course?: Course;
}
