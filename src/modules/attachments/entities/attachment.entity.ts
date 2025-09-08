import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('attachments')
export class Attachment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  objectName: string;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  mimetype: string;

  @ApiProperty()
  @Column('int')
  size: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column('uuid')
  ticketId: string;

  @ManyToOne(() => Ticket, ticket => ticket.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @ApiProperty({ description: 'Presigned URL for file access' })
  url?: string;

  constructor(partial: Partial<Attachment>) {
    Object.assign(this, partial);
  }
}