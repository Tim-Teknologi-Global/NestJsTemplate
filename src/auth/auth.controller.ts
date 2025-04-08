import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { User } from './schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Register a new user
   * @param body {email: string, password: string, username?: string}
   * @returns {access_token: string, refresh_token: string}
   */
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; username?: string },
  ) {
    return this.authService.register(body.email, body.password, body.username);
  }
  /**
   * Login a user
   * @param body {email: string, password: string}
   * @returns {access_token: string, refresh_token: string}
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  /**
   * Logout a user
   * @param request {Request}
   * @returns {message: string}
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: Request) {
    const user = request.user as User;
    return this.authService.logout(user._id);
  }
  /**
   * Refresh a user's token
   * @param body {refresh_token: string}
   * @returns {access_token: string, refresh_token: string}
   */
  @Post('refresh')
  async refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
