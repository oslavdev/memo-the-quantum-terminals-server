import { v4 } from "uuid";
import { sendEmail } from "@/utils/sendEmail";
import { User } from "@/entity/User";
import { redis } from "@/connect/redis";
import { forgotPasswordPrefix } from "@/constants/redisPrefixes";

export class ForgotPasswordResolver {
  async forgotPassword(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(
      user.username,
      email,
      `http://localhost:8080/user/change-password/${token}`
    );

    return true;
  }
}
