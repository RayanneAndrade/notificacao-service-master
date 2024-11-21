import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacaoModule } from './notificacao/notificacao.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5435,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'notificacaodb',
      autoLoadEntities: true,
      synchronize: true,
    }),    
    NotificacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
