import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { Comment } from '../comments/comment.entity';
import { ChatMessage } from '../chat/chat.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Booking, (booking) => booking.user, { cascade: true })
  bookings: Booking[];
  
  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => ChatMessage, (message) => message.sender, { cascade: true })
  sentMessages: ChatMessage[];

  @OneToMany(() => ChatMessage, (message) => message.receiver, { cascade: true })
  receivedMessages: ChatMessage[];
}
