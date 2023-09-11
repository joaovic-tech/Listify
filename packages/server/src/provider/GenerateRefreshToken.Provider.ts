import dayjs from "dayjs";
import { prisma } from "../utils/prisma";

class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "seconds").unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      }
    });

    return generateRefreshToken;
  }
}

export default new GenerateRefreshTokenProvider();
