import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    type = "type",
    name = "name",
    email = "email",
    phone = "phone",
    address = "address",
    avatar = "avatar",
    googleId = "googleId",
    password = "password",
    deleted = "deleted",
    created_at = "created_at",
    updated_at = "updated_at",
    deleted_at = "deleted_at",
    created_by_id = "created_by_id",
    updated_by_id = "updated_by_id",
    deleted_by_id = "deleted_by_id",
    verified = "verified",
    verifyToken = "verifyToken",
    verifyExpires = "verifyExpires",
    passwordResetToken = "passwordResetToken",
    passwordResetExpires = "passwordResetExpires"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
