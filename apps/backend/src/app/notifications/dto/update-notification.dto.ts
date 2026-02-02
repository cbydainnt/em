import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { NotificationStatus } from '@/enums/enum';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsInt()
  @IsEnum(NotificationStatus)
  @IsOptional()
  status?: number;
}
