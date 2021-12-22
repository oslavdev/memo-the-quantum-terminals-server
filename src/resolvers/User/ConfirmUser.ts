import { redis } from "../../connect/redis";
import { User } from "../../entity/User";
import { confirmUserPrefix } from "../../constants/redisPrefixes";

export default {
  confirmUser: async (
    _: void,
    { token }: { token: string },
    { req }: { req: Request }
  ): Promise<boolean> => {
    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token);

    return true;
  },
};
