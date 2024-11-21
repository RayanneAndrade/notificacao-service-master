import { Controller, Get, Post, Put, Delete, Param, Body, Patch, Query } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { Notificacao } from './notificacao.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('notificacoes')
@Controller('notificacoes')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications with pagination' })
  @ApiResponse({ status: 200, description: 'List of notifications.', type: [Notificacao] })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.notificacaoService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one notification' })
  @ApiResponse({ status: 200, description: 'Details of one notification.', type: Notificacao })
  findOne(@Param('id') id: number) {
    return this.notificacaoService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications by user' })
  @ApiResponse({ status: 200, description: 'List of notifications for the user.', type: [Notificacao] })
  findByUser(@Param('userId') userId: number) {
    return this.notificacaoService.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiBody({
    description: 'Notification object to be created',
    type: Notificacao,
    examples: {
      default: {
        summary: 'Example notification',
        value: {
          userId: 1,
          message: 'New investment idea available!',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Notification created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() notificacao: Notificacao) {
    return this.notificacaoService.create(notificacao);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiBody({
    description: 'Notification object to be updated',
    type: Notificacao,
    examples: {
      default: {
        summary: 'Example notification update',
        value: {
          message: 'Updated investment idea available!',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Notification updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() notificacao: Partial<Notificacao>) {
    return this.notificacaoService.update(id, notificacao);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id') id: number) {
    return this.notificacaoService.remove(id);
  }
}
