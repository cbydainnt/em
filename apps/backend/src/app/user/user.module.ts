import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { MinIOService } from '../minio/minio.service';
// import { MinIOModule } from '../minio/minio.module';
@Module({
  imports: [],
  providers: [UserResolver, UserService, MinIOService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
