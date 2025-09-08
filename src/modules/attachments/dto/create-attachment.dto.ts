import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  objectName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  ticketId: string;
}