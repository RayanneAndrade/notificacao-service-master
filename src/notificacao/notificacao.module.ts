import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacao } from './notificacao.entity';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacao])],
  providers: [NotificacaoService],
  controllers: [NotificacaoController],
})
export class NotificacaoModule {}
