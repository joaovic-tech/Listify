import { sign } from "jsonwebtoken";
import { generatedUUID } from "../config/generateUUID";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, generatedUUID, {
      subject: userId,
      expiresIn: "20s",
    });

    return token;
  }
}

export default new GenerateTokenProvider();
