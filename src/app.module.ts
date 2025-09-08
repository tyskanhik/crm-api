import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './shared/database/database.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import minioConfig from './config/minio.config';
import { StorageModule } from './shared/storage/storage.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfig]
    }),
    DatabaseModule,
    StorageModule,
    TicketsModule,
    AttachmentsModule,
  ],
})
export class AppModule {}
