import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { PrismaService } from 'src/prisma/prisma.service';

interface DecodedJWT {
  username: string;
  sub: number;
  iat: number;
}

class PermissionGuardBase {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  protected async getUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization'];
    const decodedToken = jwtDecode<DecodedJWT>(token);
    const user = await this.prisma.user.findFirst({
      where: {
        id: decodedToken.sub,
      },
    });
    return user;
  }
}

export class AdminPermissionGuard
  extends PermissionGuardBase
  implements CanActivate
{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = await this.getUser(context);
    return user.role === 'ADMIN';
  }
}
