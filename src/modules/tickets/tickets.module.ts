import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./services/tickets.service";
import { TicketRepository } from "./repositories/ticket.repository";


@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    {
      provide: 'ITicketRepository',
      useClass: TicketRepository
    }
  ],
  exports: [TicketsService],
})
export class TicketsModule {}