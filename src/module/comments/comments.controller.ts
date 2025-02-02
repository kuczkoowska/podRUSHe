import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, UnauthorizedException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addComment(@Request() req, @Body() body) {
    const userId = req.user.id;
    return this.commentsService.addComment(userId, body.packageId, body.content);
  }

  @Get(":packageId")
  getComments(@Param("packageId") packageId: number) {
    return this.commentsService.getCommentsForPackage(packageId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteComment(@Request() req, @Param("id") commentId: number) {
    if (req.user.role !== "admin") {
        throw new UnauthorizedException("Only admins can delete comments");
      }
      return this.commentsService.deleteComment(commentId, req.user.role === "admin");
    }
}
