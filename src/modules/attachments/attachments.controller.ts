import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { AttachmentsService } from './services/attachments.service';
import { Attachment } from './entities/attachment.entity';
import { multerConfig } from '../../config/multer.config';

@ApiTags('attachments')
@Controller('tickets/:ticketId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список прикреплённых файлов' })
  @ApiParam({ name: 'ticketId', description: 'ID заявки' })
  @ApiResponse({ status: 200, description: 'Список файлов', type: [Attachment] })
  async getAttachments(@Param('ticketId') ticketId: string): Promise<Attachment[]> {
    return this.attachmentsService.findAllByTicket(ticketId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Загрузить файл в заявку' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'ticketId', description: 'ID заявки' })
  @ApiBody({
    description: 'Файл для загрузки',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Файл загружен', type: Attachment })
  @ApiResponse({ status: 400, description: 'Неверный тип файла' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async uploadAttachment(
    @Param('ticketId') ticketId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Attachment> {
    return this.attachmentsService.uploadFile(ticketId, file);
  }

  @Get(':fileId/download')
  @ApiOperation({ summary: 'Скачать конкретный файл' })
  @ApiParam({ name: 'ticketId', description: 'ID заявки' })
  @ApiParam({ name: 'fileId', description: 'ID файла' })
  @ApiResponse({ status: 200, description: 'Файл для скачивания' })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  async downloadAttachment(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ): Promise<void> {
    const { stream, attachment } = await this.attachmentsService.getFileStream(fileId);
    
    res.set({
      'Content-Type': attachment.mimetype,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(attachment.originalName)}"`,
      'Content-Length': attachment.size.toString(),
    });

    stream.pipe(res);
  }

  @Delete(':fileId')
  @ApiOperation({ summary: 'Удалить файл' })
  @ApiParam({ name: 'ticketId', description: 'ID заявки' })
  @ApiParam({ name: 'fileId', description: 'ID файла' })
  @ApiResponse({ status: 204, description: 'Файл удален' })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  async deleteAttachment(@Param('fileId') fileId: string): Promise<void> {
    return this.attachmentsService.remove(fileId);
  }
}