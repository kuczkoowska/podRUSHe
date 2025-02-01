import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Package } from '../packages/package.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Package)
  @JoinColumn()
  package: Package;

  @Column('date')
  bookingDate: Date;

  @Column()
  totalPrice: number;

  @Column({ default: 1 })
  numberOfTravelers: number;
}
