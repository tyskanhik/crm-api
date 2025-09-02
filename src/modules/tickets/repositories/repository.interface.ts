import { CreateTicketDto } from "../dto/create-ticket.dto";
import { Ticket } from "../entities/ticket.entity";
import { TicketStatus } from "../enums/ticket-status.enum";

export interface ITicketRepository {
  findAll(status?: TicketStatus): Promise<Ticket[]>;
  findById(id: string): Promise<Ticket | null>;
  create(createTicketDto: CreateTicketDto): Promise<Ticket>;
  update(id: string, updateData: Partial<CreateTicketDto>): Promise<Ticket | null>;
  delete(id: string): Promise<boolean>;
}