import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WorkersService } from 'src/workers/workers.service';

@Injectable()
export class AuthService {
  constructor(
    private workersService: WorkersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.workersService.findWorker(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      admin: user.admin,
      activo: user.activo,
      nombre: user.nombre,
      image: user.image,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
