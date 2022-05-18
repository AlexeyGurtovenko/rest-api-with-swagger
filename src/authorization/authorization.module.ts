import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { ApiKeyStrategy } from "./api-key.strategy";

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [ApiKeyStrategy],
})
export class AuthenticationModule {}
