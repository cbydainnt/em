import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserNotificationWhereInput } from './user-notification-where.input';
import { Type } from 'class-transformer';
import { UserNotificationOrderByWithRelationInput } from './user-notification-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserNotificationWhereUniqueInput } from './user-notification-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserNotificationScalarFieldEnum } from './user-notification-scalar-field.enum';

@ArgsType()
export class FindManyUserNotificationArgs {

    @Field(() => UserNotificationWhereInput, {nullable:true})
    @Type(() => UserNotificationWhereInput)
    where?: UserNotificationWhereInput;

    @Field(() => [UserNotificationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserNotificationOrderByWithRelationInput>;

    @Field(() => UserNotificationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserNotificationWhereUniqueInput, 'id' | 'user_id_notification_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UserNotificationScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UserNotificationScalarFieldEnum>;
}
