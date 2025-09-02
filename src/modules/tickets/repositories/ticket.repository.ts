import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "../entities/ticket.entity";
import { Repository } from "typeorm";
import { TicketStatus } from "../enums/ticket-status.enum";
import { CreateTicketDto } from "../dto/create-ticket.dto";


@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {}

  async findAll(status?: TicketStatus): Promise<Ticket[]> {
    const tickets = this.ticketRepository
      .createQueryBuilder('ticket')
      .orderBy('ticket.createdAt', 'DESC');

    if (status) {
      tickets.where('ticket.status = :status', { status });
    }

    return tickets.getMany()
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({ where: { id }});
  }

  async create(createTticket: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTticket);
    return this.ticketRepository.save(ticket);
  }

  async update(id: string, updateTicket: Partial<CreateTicketDto>): Promise<Ticket | null> {
    await this.ticketRepository.update(id, updateTicket);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.ticketRepository.delete(id);
    return !!result.affected;
  }
}