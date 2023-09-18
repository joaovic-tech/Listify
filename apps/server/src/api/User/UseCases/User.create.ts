import { User } from "@prisma/client";
import { UserInterface, userSchemas } from "../user.types";
import { prisma } from "../../../utils/prisma";
import UserService from "../User.service";

class CreateUserUseCase {
  async execute(userData: UserInterface): Promise<User> {
    const { name, username, email, password } = userSchemas.parse(userData);

    const userAlreadyExists = await UserService.findUserByEmail(userData.email);

    if (userAlreadyExists) {
      throw new Error("User already exist!");
    }

    const userCreated = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password,
      },
    });

    return userCreated;
  }
}

export default new CreateUserUseCase();
