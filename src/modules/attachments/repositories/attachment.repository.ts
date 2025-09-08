import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAttachmentRepository } from './attachment-repository.interface';
import { Attachment } from '../entities/attachment.entity';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

@Injectable()
export class TypeOrmAttachmentRepository implements IAttachmentRepository {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment> {
    const attachment = this.attachmentRepository.create(createAttachmentDto);
    return this.attachmentRepository.save(attachment);
  }

  async findById(id: string): Promise<Attachment | null> {
    return this.attachmentRepository.findOne({
      where: { id },
      relations: ['ticket'],
    });
  }

  async findByTicketId(ticketId: string): Promise<Attachment[]> {
    return this.attachmentRepository.find({
      where: { ticketId },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.attachmentRepository.delete(id);
    return !!result.affected;
  }
}