import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class TimestampEntities {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
