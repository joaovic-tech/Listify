import { compare } from "bcrypt";
import { UserLoginInterface } from "../User/user.types";
import { prisma } from "../../utils/prisma";
import GenerateTokenProvider from "../../provider/GenerateToken.Provider";
import GenerateRefreshTokenProvider from "../../provider/GenerateRefreshToken.Provider";

class AuthenticateUserUseCase {
  async execute(userData: UserLoginInterface) {
    let userAlreadyExists;

    if ("email" in userData) {
      userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: userData.email,
        },
      });
    } else if ("username" in userData) {
      userAlreadyExists = await prisma.user.findFirst({
        where: {
          username: userData.username,
        },
      });
    }

    if (!userAlreadyExists) {
      throw new Error("User or password incorrect!");
    }

    const passwordMatch = await compare(userData.password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("User or password incorrect!");
    }

    // gerando token de usuário
    const token = await GenerateTokenProvider.execute(
      userAlreadyExists.id
    );

    // removendo todos os refresh_token's do user
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      }
    });

    const refreshToken = await GenerateRefreshTokenProvider.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export default new AuthenticateUserUseCase();
