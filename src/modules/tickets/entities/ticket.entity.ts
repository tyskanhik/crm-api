import { ApiProperty } from "@nestjs/swagger";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";

export class Ticket {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: Object.values(TicketPriority) })
  priority: TicketPriority;

  @ApiProperty({ enum: Object.values(TicketStatus) })
  status: TicketStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Ticket>) {
    Object.assign(this, partial);
  }
}
