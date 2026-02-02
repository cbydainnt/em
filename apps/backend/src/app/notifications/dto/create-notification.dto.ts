import { IsString, IsInt, IsOptional, IsEnum, IsObject } from 'class-validator';
import { NotificationType, NotificationStatus } from '@/enums/enum';

export class CreateNotificationDto {
  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  user_type?: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsInt()
  @IsEnum(NotificationType)
  type: number;

  @IsString()
  @IsOptional()
  context?: string;

  @IsString()
  @IsOptional()
  action_url?: string;

  @IsInt()
  @IsEnum(NotificationStatus)
  @IsOptional()
  status?: number;

  course_id?: string;
  lesson_id?: string;
}
