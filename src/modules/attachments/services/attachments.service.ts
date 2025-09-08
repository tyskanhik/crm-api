import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as repositoryInterface from '../repositories/attachment-repository.interface'
import { TicketsService } from '../../tickets/services/tickets.service';
import { StorageService } from '../../../shared/storage/storage.service';
import { Attachment } from '../entities/attachment.entity';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @Inject('IAttachmentRepository')
    private readonly attachmentRepository: repositoryInterface.IAttachmentRepository,
    private readonly ticketsService: TicketsService,
    private readonly storageService: StorageService,
  ) {}

  async uploadFile(
    ticketId: string,
    file: Express.Multer.File,
  ): Promise<Attachment> {
    await this.ticketsService.findOne(ticketId);

    const objectName = await this.storageService.uploadFile(file);

    const attachmentData: CreateAttachmentDto = {
      objectName,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      ticketId,
    };

    return this.attachmentRepository.create(attachmentData);
  }

  async findAllByTicket(ticketId: string): Promise<Attachment[]> {
    await this.ticketsService.findOne(ticketId);
    const attachments = await this.attachmentRepository.findByTicketId(ticketId);
    
    return Promise.all(
      attachments.map(async (attachment) => ({
        ...attachment,
        url: await this.storageService.getFileUrl(attachment.objectName),
      }))
    );
  }

  async findOne(id: string): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findById(id);
    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }
    
    return {
      ...attachment,
      url: await this.storageService.getFileUrl(attachment.objectName),
    };
  }

  async remove(id: string): Promise<void> {
    const attachment = await this.findOne(id);
    
    await this.storageService.deleteFile(attachment.objectName);

    const deleted = await this.attachmentRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }
  }

  async getFileStream(id: string): Promise<{ stream: NodeJS.ReadableStream; attachment: Attachment }> {
    const attachment = await this.attachmentRepository.findById(id);
    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }

    const { stream, metaData } = await this.storageService.getFile(attachment.objectName);
    
    const updatedAttachment = {
      ...attachment,
      originalName: metaData.metaData?.['original-name'] || attachment.originalName,
      mimetype: metaData.metaData?.['content-type'] || attachment.mimetype,
      size: metaData.size,
    };
    
    return { stream, attachment: updatedAttachment };
  }
}