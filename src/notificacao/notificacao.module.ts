import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Notificacao } from './notificacao.entity';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoListener } from './notificacaoListener.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notificacao]),
    EventEmitterModule.forRoot(),
  ],
  providers: [NotificacaoService, NotificacaoListener],
  controllers: [NotificacaoController],
})
export class NotificacaoModule {}
