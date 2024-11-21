import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  message: string;

  @Column()
  createdAt: Date;
}
