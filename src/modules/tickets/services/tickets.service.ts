import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Ticket } from "../entities/ticket.entity";
import { TicketStatus } from "../enums/ticket-status.enum";
import * as repositoryInterface from "../repositories/repository.interface";
import { CreateTicketDto } from "../dto/create-ticket.dto";



@Injectable()
export class TicketsService {
  constructor(
    @Inject('ITicketRepository')
    private readonly ticketRepository: repositoryInterface.ITicketRepository,
  ) {}

  async findAll(status?: TicketStatus): Promise<Ticket[]> {
    return this.ticketRepository.findAll(status)
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepository.create(createTicketDto);
  }

  async update(id: string, updateData: Partial<CreateTicketDto>): Promise<Ticket> {
    const ticket = await this.ticketRepository.update(id, updateData);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.ticketRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
  }
}