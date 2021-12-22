import { User } from "../../entity/User";
import { Context } from "../../types/Context";

export default {
  me: async (
    _: void,
    args: void,
    context: Context
  ): Promise<User | undefined> => {

    if (!context.req.session!.userId) {
      return undefined;
    }

    return User.findOne(context.req.session!.userId);
  },
};
