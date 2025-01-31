import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  duration: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column("simple-array", { nullable: true })
  included: string[]; // Flights, Hotel, Breakfast

  @Column("simple-array", { nullable: true })
  excluded: string[]; // Lunch
}
