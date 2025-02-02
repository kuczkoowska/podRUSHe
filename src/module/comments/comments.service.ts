import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../comments/comment.entity";
import { User } from "../users/user.entity";
import { Package } from "../packages/package.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>
  ) {}

  async addComment(userId: number, packageId: number, content: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const packageItem = await this.packageRepository.findOne({ where: { id: packageId } });

    if (!user || !packageItem) throw new Error("User or Package not found");

    const comment = this.commentRepository.create({ content, user, package: packageItem });
    return this.commentRepository.save(comment);
  }

  async getCommentsForPackage(packageId: number) {
    return this.commentRepository.find({ where: { package: { id: packageId } }, relations: ["user"] });
  }

  async deleteComment(commentId: number, isAdmin: boolean) {
    if (!isAdmin) throw new Error("Only admins can delete comments");
    return this.commentRepository.delete(commentId);
  }
}
