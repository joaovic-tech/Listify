import { prisma } from "../../utils/prisma";

class UserService {
  async findUserByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserByUsername(username: string) {
    const user = prisma.user.findUnique({
      where: {
        username,
      }
    });

    return user;
  }
}

export default new UserService();
