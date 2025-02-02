import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, UnauthorizedException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(":id")
  deleteComment(@Param("id") commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
