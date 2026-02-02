import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { AppModule } from './app/app.module';
import { RegistModule } from './app/regist/regist.module';
import { CommentModule } from './app/comment/comment.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { convertDate } from './utils';
import { M_SystemModule } from './app/M_System/m_system.module';
import { CategoryModule } from './app/category/category.module';
import { ComboModule } from './app/combo/combo.module';
import { CourseModule } from './app/Course/course.module';
import { LessonModule } from './app/lesson/lesson.module';
import { MinIOModule } from './app/minio/minio.module';
import { NotificationsModule } from './app/notifications/notifications.module';
import { ReviewModule } from './app/review/review.module';
import { ReportModule } from './app/report/report.module';
import { CartItemModule } from './app/Cart_item/cart-item.module';
import { OrderModule } from './app/order/order.module';
import { ActiveCodeModule } from './app/active_code/active-code.module';
import { QRCodeModule } from './app/qrcode/qrcode.module';
import { DiscountVoucherModule } from './app/discount-voucher/discount-voucher.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CourseExpireService } from './utils/course-expire.service';
import { NoteModule } from './app/note/note.module';
import { SectionModule } from './app/section/section.module';
import { PrismaModule } from './app/prisma/prisma.module';
import { BannerModule } from './app/banner/banner.module';
import { QuizModule } from './app/quiz/quiz.module';
import { UserCoursesModule } from './app/user_courses/user_courses.module';
import { TeacherProfileModule } from './app/teacher-profile/teacher-profile.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        // let's log errors into its own file
        new transports.File({
          filename: `../../logs/${convertDate(new Date())}error.log`,
          level: 'error',
          format: format.combine(format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), format.json()),
        }),
        new transports.File({
          filename: `../../logs/${convertDate(new Date())}debug.log`,
          level: 'debug',
          format: format.combine(format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), format.json()),
        }),
        // logging all level
        new transports.File({
          filename: `../../logs/${convertDate(new Date())}combined.log`,
          format: format.combine(format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), format.json()),
        }),
        // we also want to see logs in our console
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
            format.printf((info) => {
              // console.log(format.timestamp());
              //return `${new Date(info.timestamp).toLocaleString()} ${info.level}: ${info.message}`;
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['../../.env', '.env'], // ưu tiên .env ở root
      expandVariables: true, // bật dotenv-expand
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        sortSchema: true,
        playground: {
          settings: {
            'request.credentials': 'include',
            'editor.reuseHeaders': false,
          },
        },
        debug: configService.get<boolean>('DEBUG'),
        uploads: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'admin', 'dist'),
      serveRoot: '/admin',
      exclude: ['/api/(.*)'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
      exclude: ['/api/(.*)', '/admin/(.*)'],
    }),
    AppModule,
    UserModule,
    CommentModule,
    AuthModule,
    RegistModule,
    M_SystemModule,
    CategoryModule,
    ComboModule,
    ReportModule,
    CourseModule,
    UserCoursesModule,
    LessonModule,
    MinIOModule,
    ReviewModule,
    NotificationsModule,
    CartItemModule,
    OrderModule,
    ActiveCodeModule,
    QRCodeModule,
    DiscountVoucherModule,
    NoteModule,
    SectionModule,
    PrismaModule,
    BannerModule,
    QuizModule,
    TeacherProfileModule,
  ],
  providers: [
    CourseExpireService, // Đăng ký service chạy nền
  ],
})
export class MainModule {}
