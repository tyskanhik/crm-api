import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { TicketsService } from "./services/tickets.service";
import { TicketStatus } from "./enums/ticket-status.enum";
import { Ticket } from "./entities/ticket.entity";
import { CreateTicketDto } from "./dto/create-ticket.dto";



@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех заявок' })
  @ApiQuery({ name: 'status', required: false, enum: TicketStatus })
  @ApiResponse({ status: 200, description: 'Список заявок', type: [Ticket] })
  async getTickets(@Query('status') status?: TicketStatus): Promise<Ticket[]> {
    return this.ticketsService.findAll(status)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить одну заявку' })
  @ApiParam({ name: 'id', description: 'ID заявки' })
  @ApiResponse({ status: 200, description: 'Данные заявки', type: Ticket })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async getTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать заявку' })
  @ApiResponse({
    status: 201,
    description: 'Заявка создана',
    type: Ticket,
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить заявку' })
  @ApiParam({ name: 'id', description: 'ID заявки' })
  @ApiBody({
  type: CreateTicketDto,
  required: false,
  description: 'Поля для обновления (все опциональны)'
  })
  @ApiResponse({ status: 200, description: 'Заявка обновлена', type: Ticket })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async updateTicket(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateTicketDto>,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заявку' })
  @ApiParam({ name: 'id', description: 'ID заявки' })
  @ApiResponse({ status: 204, description: 'Заявка удалена' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  async deleteTicket(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(id);
  }
}