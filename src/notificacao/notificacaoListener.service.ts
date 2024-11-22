import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Notificacao } from './notificacao.entity';
import axios from 'axios';

@Injectable()
export class NotificacaoListener {
    @OnEvent('notificacao.created')
    async handleNotificacaoCreatedEvent(notificacao: Notificacao) {
        const webhookUrl = 'https://outlook.office.com/webhook/YOUR_WEBHOOK_URL';
        const message = {
            text: `Nova notificação: ${notificacao.message}`,
        };

        try {
            const response = await axios.post(webhookUrl, message);
            console.log('Mensagem enviada ao webhook com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar mensagem ao webhook:', error);
        }
    }
}
