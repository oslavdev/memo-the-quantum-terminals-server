import MeResolver from "./User/Me";
import LoginResolver from "./User/Login";
import RegisterResolver from "./User/Register";
import ConfirmUserResolver from "./User/ConfirmUser";
import LogoutResolver from "./User/Logout";

export const resolvers = {
  Query: {
    ...MeResolver,
  },
  Mutation: {
    ...LoginResolver,
    ...RegisterResolver,
    ...ConfirmUserResolver,
    ...LogoutResolver
  },
};
