import { Attachment } from '../entities/attachment.entity';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

export interface IAttachmentRepository {
  create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment>;
  findById(id: string): Promise<Attachment | null>;
  findByTicketId(ticketId: string): Promise<Attachment[]>;
  delete(id: string): Promise<boolean>;
}