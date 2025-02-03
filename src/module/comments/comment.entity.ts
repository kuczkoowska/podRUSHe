import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Package } from "../packages/package.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Package, (packageItem) => packageItem.comments, { onDelete: "CASCADE" })
  package: Package;
}
