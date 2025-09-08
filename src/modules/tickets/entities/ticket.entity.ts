import { ApiProperty } from "@nestjs/swagger";
import { TicketPriority } from "../enums/ticket-priority.enum";
import { TicketStatus } from "../enums/ticket-status.enum";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Attachment } from "src/modules/attachments/entities/attachment.entity";

@Entity('tickets')
export class Ticket {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 255 })
  title: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ enum: TicketPriority })
  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.LOW
  })
  priority: TicketPriority;

  @ApiProperty({ enum: TicketStatus })
  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.NEW
  })
  status: TicketStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Attachment, attachment => attachment.ticket)
  attachments: Attachment[];

  constructor(partial: Partial<Ticket>) {
    Object.assign(this, partial);
  }
}
