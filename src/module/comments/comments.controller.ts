import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, UnauthorizedException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

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
