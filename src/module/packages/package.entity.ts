import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  destination: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column("simple-array", { nullable: true })
  included: string[];

  @Column("simple-array", { nullable: true })
  excluded: string[];
  
  @OneToMany(() => Comment, (comment) => comment.package)
  comments: Comment[];
}
