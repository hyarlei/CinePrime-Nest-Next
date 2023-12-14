import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redisCache: CacheService,
  ) { }

  async signIn(email: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException({ MessageChannel: 'Usuário não existe no sistema' });
    }
    const payload =
    {
      Userid: user.id,
      Userpassword: user.password,
      userEmail: user.email,
      userName: user.nome,
      isAdmin: user.isAdmin
    };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    await this.redisCache.storeData(token.access_token);
    return token;
  }
}