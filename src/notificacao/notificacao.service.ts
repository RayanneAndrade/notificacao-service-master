import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './notificacao.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectRepository(Notificacao)
    private notificacaoRepository: Repository<Notificacao>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(notificacao: Notificacao): Promise<Notificacao> {
    notificacao.createdAt = new Date();
    const newNotificacao = await this.notificacaoRepository.save(notificacao);
    this.eventEmitter.emit('notificacao.created', newNotificacao);
    return newNotificacao;
  }

  findAll(page: number, limit: number): Promise<Notificacao[]> {
    return this.notificacaoRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number): Promise<Notificacao> {
    return this.notificacaoRepository.findOne({ where: { id } });
  }

  findByUser(userId: number): Promise<Notificacao[]> {
    return this.notificacaoRepository.find({ where: { userId } });
  }


  async update(id: number, notificacao: Partial<Notificacao>): Promise<void> {
    await this.notificacaoRepository.update(id, notificacao);
  }

  async remove(id: number): Promise<void> {
    await this.notificacaoRepository.delete(id);
  }
}
