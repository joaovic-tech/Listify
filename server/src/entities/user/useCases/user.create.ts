import { User } from "@prisma/client";
import { prisma } from "../../../prisma";
import { UserInterface, userSchemas } from "../interface/user.interface";

class CreateUserUseCase {
  async execute(userData: UserInterface): Promise<User> {
    const user = userSchemas.parse(userData);

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User Already Exist");
    }

    const userCreated = await prisma.user.create({
      data: user
    });

    return userCreated;
  }
}

export default new CreateUserUseCase();
