import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-headerapikey";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, "api-key") {
  
  constructor(private readonly _configService: ConfigService) {
    super({ header: "X-API-KEY", prefix: "" }, 
          true, 
          async (apiKey, done) => this.validate(apiKey, done)
         );
  }

  public validate = (incomingApiKey: string, done: (error: Error, data) => Record<string, unknown>) => {
    const configApiKey = this._configService.get("apiKey");

    if (configApiKey === incomingApiKey) {
      done(null, true);
    }

    done(new UnauthorizedException(), null);
  };
}