import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacao } from './notificacao.entity';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectRepository(Notificacao)
    private notificacaoRepository: Repository<Notificacao>,
  ) {}

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

  create(notificacao: Notificacao): Promise<Notificacao> {
    notificacao.createdAt = new Date();
    return this.notificacaoRepository.save(notificacao);
  }

  async update(id: number, notificacao: Partial<Notificacao>): Promise<void> {
    await this.notificacaoRepository.update(id, notificacao);
  }

  async remove(id: number): Promise<void> {
    await this.notificacaoRepository.delete(id);
  }
}
