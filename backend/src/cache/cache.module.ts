import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';

@Module({
  imports: [UsersModule, JwtModule, CacheModule.register()],
  controllers: [CacheController],
  providers: [AuthService, CacheService],
  exports: [CacheService],
})
export class AppCacheModule {}