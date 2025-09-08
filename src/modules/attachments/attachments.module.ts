import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './services/attachments.service';
import { TypeOrmAttachmentRepository } from './repositories/attachment.repository';
import { Attachment } from './entities/attachment.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { StorageModule } from '../../shared/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    TicketsModule,
    StorageModule,
  ],
  controllers: [AttachmentsController],
  providers: [
    AttachmentsService,
    {
      provide: 'IAttachmentRepository',
      useClass: TypeOrmAttachmentRepository,
    },
  ],
})
export class AttachmentsModule {}