import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AddCommentDto } from "./dto/comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  addComment(@Request() req, @Body() body: AddCommentDto) {
      const userId = req.user.userId;
      return this.commentsService.addComment(userId, body.packageId, body.content);
  }

  @Get(":packageId")
  getComments(@Param("packageId") packageId: number) {
    return this.commentsService.getCommentsForPackage(packageId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(":id")
  deleteComment(@Param("id") commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
