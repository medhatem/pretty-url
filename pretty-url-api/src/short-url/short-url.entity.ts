import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  destination: string;

  @Column({ default: 0 })
  visits: number;

  @CreateDateColumn()
  createdAt: Date;
}
