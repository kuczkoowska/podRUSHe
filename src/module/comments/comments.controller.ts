import { Controller, Post, Get, Delete, Body, Param, Request, UseGuards, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AddCommentDto } from "./dto/comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create comment' })
  @Post()
  addComment(@Request() req, @Body() body: AddCommentDto) {
      const userId = req.user.userId;
      return this.commentsService.addComment(userId, body.packageId, body.content);
  }

  @ApiOperation({ summary: 'See comments for the chosen package' })
  @Get(":packageId")
  getComments(@Param("packageId") packageId: number) {
    return this.commentsService.getCommentsForPackage(packageId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete comment' })
  @Delete(":id")
  deleteComment(@Param("id") commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
