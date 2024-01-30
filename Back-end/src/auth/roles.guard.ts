import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const passportActive = super.canActivate(context);

    if (!passportActive) {
      throw new HttpException('No tienes permiso', HttpStatus.UNAUTHORIZED);
    }

    const request = context.switchToHttp().getRequest();
    const user: { admin: boolean } = request.user;

    if (!user.admin) {
      throw new HttpException(
        'No tienes permisos de administración',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
