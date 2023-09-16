import dayjs from "dayjs";
import GenerateTokenProvider from "../../provider/GenerateToken.Provider";
import { prisma } from "../../utils/prisma";
import GenerateRefreshTokenProvider from "../../provider/GenerateRefreshToken.Provider";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    });

    if (!refreshToken) {
      throw new Error("Refresh token invalid");
    }

    const token = await GenerateTokenProvider.execute(refreshToken.userId);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    if (refreshTokenExpired) {
      // removendo todos os refresh_token's do user
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      });

      const newRefreshToken = await GenerateRefreshTokenProvider.execute(refreshToken.userId);

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export default new RefreshTokenUserUseCase();
